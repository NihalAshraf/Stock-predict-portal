from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockSerializer
from rest_framework.response import Response
from rest_framework import status
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
from django.conf import settings
import os
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score
# Create your views here.
class StockPredictionAPIView(APIView):

    def post(self, request):
       serializer = StockSerializer(data=request.data)
       if serializer.is_valid():
              ticker = serializer.validated_data['ticker']
              now = datetime.now()
              start = datetime(now.year - 10, now.month, now.day)
              df = yf.download(ticker, start=start, end=now)
              if df.empty:
                  return Response({'error': 'No data found for the ticker'}, status=status.HTTP_404_NOT_FOUND)
              df = df.reset_index()

              plt.switch_backend('AGG')
              plt.figure(figsize = (12,5))
              plt.plot(df.Close, label='Close Price')
              plt.xlabel('Days')
              plt.ylabel('Close Price')
              plt.title(f'close price of {ticker} stock')
              plt.legend()

              plot_img_path=f'{ticker}_plot.png'
              plot_img = save_plot(plot_img_path)
              
              ma100 = df.Close.rolling(100).mean()
              plt.switch_backend('AGG')
              plt.figure(figsize = (12,5))
              plt.plot(df.Close, label='Close Price')
              plt.plot(ma100, label='100 Day Moving Average',color='red')
              plt.xlabel('Days')
              plt.ylabel('Close Price')
              plt.title(f'close price of {ticker} stock')
              plt.legend()

              plot_img_path=f'{ticker}_100_dma.png'
              plot_100_dma = save_plot(plot_img_path)

              # Splitting data into Training and Testing
              data_training = pd.DataFrame(df.Close[0:int(len(df)*0.70)])
              data_testing = pd.DataFrame(df.Close[int(len(df)*0.70): int(len(df))])

              scaler = MinMaxScaler(feature_range=(0,1))
              model=load_model('keras_model.keras')

              past_100_days = data_training.tail(100)
              final_df= pd.concat([past_100_days, data_testing], ignore_index=True)
              input_data = scaler.fit_transform(final_df)

              x_test = []
              y_test = []
              for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i, 0])
              x_test, y_test = np.array(x_test), np.array(y_test)

              y_predicted = model.predict(x_test)

              y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
              y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()
              
              
              plt.switch_backend('AGG')
              plt.figure(figsize = (12,5))
              plt.plot(y_test,'b', label='Original Price')
              plt.plot(y_predicted, label='Predicted Price ',color='red')
              plt.xlabel('Days')
              plt.ylabel(' Price')
              plt.title(f'Final prediction of {ticker} stock')
              plt.legend()

              plot_img_path=f'{ticker}_final_pred.png'
              plot_prediction = save_plot(plot_img_path)

              mse = mean_squared_error(y_test, y_predicted)
              rmse = np.sqrt(mse)
              r2 = r2_score(y_test, y_predicted)

              return Response({'status': 'success','plot_img':plot_img,'plot_100_dma':plot_100_dma,'plot_prediction':plot_prediction,'mse':mse,'rmse':rmse,'r2':r2}, status=status.HTTP_200_OK)

