import { SERVER_INFO_MESSAGE, TEXT_MESSAGE, USER_CONNECTED } from '../net/ws/MessageProps';

export const connect_message = {
  'headers': {
    'username': 'samuel123',
    'chatId': 'c-1',
    'sessionId': 44,
    'type': USER_CONNECTED,
    'date': 1659023300583,
    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW11ZWwxMjMiLCJyb2xlIjoiU1RVREVOVCIsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MC9hcGkvdjEvbG9naW4iLCJleHAiOjE2NTkwMzc2OTV9.j6LiFVr51yK6kCMfat9uXPQau2fkklkRR_tYD0hzy74',
  }, 'body': { 'encoding': 'UTF-8', 'content': 'Hi (connect)' },
};

export const normal_message = {
  'headers': {
    'username': 'samuel123',
    'chatId': 'c-1',
    'sessionId': 44,
    'type': TEXT_MESSAGE,
    'date': 1659023302512,
    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW11ZWwxMjMiLCJyb2xlIjoiU1RVREVOVCIsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MC9hcGkvdjEvbG9naW4iLCJleHAiOjE2NTkwMzc2OTV9.j6LiFVr51yK6kCMfat9uXPQau2fkklkRR_tYD0hzy74',
  }, 'body': { 'encoding': 'UTF-8', 'content': 'hola (normal)' },
};

export const server_info_message = {
  'headers': {
    'username': 'Server',
    'chatId': 'c-1',
    'sessionId': 44,
    'type': SERVER_INFO_MESSAGE,
    'date': 1659023302512,
    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW11ZWwxMjMiLCJyb2xlIjoiU1RVREVOVCIsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MC9hcGkvdjEvbG9naW4iLCJleHAiOjE2NTkwMzc2OTV9.j6LiFVr51yK6kCMfat9uXPQau2fkklkRR_tYD0hzy74',
  }, 'body': { 'encoding': 'UTF-8', 'content': 'SERVER IS GOING TO MAINTENANCE FOR 15 MINUTES' },
};

export const disconnect_message = {
  'headers': {
    'username': 'samuel123',
    'chatId': 'c-1',
    'sessionId': 44,
    'type': 'USER_DISCONNECTED',
    'date': 1659023313273,
    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW11ZWwxMjMiLCJyb2xlIjoiU1RVREVOVCIsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MC9hcGkvdjEvbG9naW4iLCJleHAiOjE2NTkwMzc2OTV9.j6LiFVr51yK6kCMfat9uXPQau2fkklkRR_tYD0hzy74',
  }, 'body': { 'encoding': 'UTF-8', 'content': 'Bye (disconnect)' },
};

