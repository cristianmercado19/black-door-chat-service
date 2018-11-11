import { ChatService } from '../chat-service/chat-service';
import { MessageBuilderSimple } from '../message-builder/message-builder-simple';

async function init(): Promise<void> {
  console.log("service.creatNewOffer");

  const messageBuilder = new MessageBuilderSimple();
  const pc1 = new ChatService(messageBuilder);

  console.log('%c PC1 Before create New Offer ', 'background: #222; color: #bada55');
  const offerPc1 = await pc1.creatNewOffer()
  console.log(offerPc1);
  console.log('%c PC1 after create New Offer ', 'background: red; color: blue');



  const pc2 = new ChatService(messageBuilder);

  console.log('%c PC2 Before create New Offer ', 'background: #222; color: #bada55');
  const offerPc2 = await pc2.createAnAnswer(offerPc1)
  console.log(offerPc2);
  console.log('%c PC2 after create New Offer ', 'background: red; color: blue');

  await pc1.setupAnswer(offerPc2);

  let messageFromPc2Arrived = false;
  let messageFromPc1Arrived = false;

  pc1.subscribeOnChannelIsOpened(() => {
    console.log('PC1 channel has been opened');  
  });

  pc1.subscribeOnNewMessageArrive((message) => {
    console.log('PC1 received a message ->', message);

    if (message === 'msgFromPc2'){
     messageFromPc2Arrived = true; 
    }
  })

  
  pc2.subscribeOnChannelIsOpened(() => {
    console.log('PC2 channel has been opened');  
  });

  pc2.subscribeOnNewMessageArrive((message) => {
    console.log('PC2 received a message ->', message);

    if (message === 'msgFromPc1'){
      messageFromPc1Arrived = true;
    }
  })

  setTimeout(function () {
    const message = 'msgFromPc2';
    console.log('pc2 is sending: "' + message + '" ....');
    pc2.sendMessage(message);
  }, 1000 * 3);

  setTimeout(function () {
    const message = 'msgFromPc1';
    console.log('pc1 is sending: "' + message + '" ....');
    pc1.sendMessage(message);
  }, 1000 * 6);

  setTimeout(function () {
    if (messageFromPc1Arrived && messageFromPc2Arrived) {
      document.getElementById('pass').style.display = 'block';
    }else{
      document.getElementById('fail').style.display = 'block';
    }

    document.getElementById('running').style.display = 'none';

  }, 1000 * 10);

}

init();
