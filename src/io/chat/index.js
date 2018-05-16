import getReducer from './dux';
import Chat from './chat';
import ChatEngineCore from 'chat-engine';

const chat = new Chat(ChatEngineCore);

const reducer = getReducer(chat);

export default reducer;