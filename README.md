# Black Door Chat - Service

Where this project coming from? [Black Door Chat Project Introduction](https://github.com/cristianmercado19/black-door-chat).

## Project

I have just implemented the minimum necessary interfaces for committing the controller's requirements.</br>
This **ChatService** hides the implementation of `webrtc-adapter/out/adapter.js`</br>
The complexity of the signialling process, the offer and answer manipulation among others.</br>
I personally believe those *265 lines of code* could be reduced if we separate the responsibility of this class. As an example, I could extract in a separate class the signaling process.</br>
However, I have decided to keep it as a single class for the moment.

## Commands

1. Install dependencies `yarn install`
2. Regenerate the distribution package (`dist` directory ) `yarn build`
3. Run minimal testing `yarn start` and navigate to `lib/test/index`

## Testing

Particularly in this project I have included a minimal testing (`lib/test/index.ts`) which runs when you execute `yarn start` command. It is because the implementation of `adapter.js` requires a **live browser**.

Just run `yarn start`, navigate to `lib/test/index` and open the console to see more details.

`lib/test/index.ts` will give you an idea about the use of this `ChatService` class. In fact, this test emulates a **simple conversation** between 2 peers sending a simple message.
