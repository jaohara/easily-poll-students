import React from 'react';
import './style/App.scss';

import SASSTestSpan from './components/ui/SASSTestSpan/SASSTestSpan';

function App() {
  return (
    // TODO: Remove .hello-world 
    <div className="App hello-world">
      <h1>Easy Poll App!</h1>

      <p>Hey, you&apos;ve got a local copy running!</p>

      <p>
        Now I&apos;m going to test <span className='apply-test-color'>SASS variables.</span>
      </p>

      <p>
        Above was done manually, now I&apos;m going to use the <SASSTestSpan>Component that I created.</SASSTestSpan>
      </p>
    </div>
  );
}

export default App;
