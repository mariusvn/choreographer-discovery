import Choreographer from './choreographer/Choreographer.js';

/* Scene 1 */

const setupScene1 = async () => {
  const generateTileChoreographer = async (id) => {
    const cssQuery = '.screen.screen-2 .scene-1 .tile.tile-' + id
    return new Choreographer({
      animations: [
        {
          range: [500, 800],
          selector: cssQuery,
          type: 'scale',
          style: 'opacity',
          from: 0,
          to: 1
        },
        {
          range: [500, 800],
          selector: cssQuery,
          type: 'scale',
          style: 'transform:translateY',
          from: 100,
          to: 100 + id * 70,
          unit: 'px'
        },
        {
          range: [500, 800],
          selector: cssQuery,
          type: 'scale',
          style: 'transform:rotate',
          from: 0,
          to: 17,
          unit: 'deg'
        },
        {
          range: [500, 800],
          selector: cssQuery,
          type: 'scale',
          style: 'width',
          from: 200,
          to: 200 - id * 10,
          unit: 'px'
        },
        {
          range: [500, 800],
          selector: cssQuery,
          type: 'scale',
          style: 'height',
          from: 200,
          to: 200 - id * 10,
          unit: 'px'
        }
      ]
    });
  }
  const generateYesChoreographer = async () => {
    const selector = '.screen.screen-2 .scene-2 .yes';
    return new Choreographer({
        animations: [
          {
            range: [1250, 1400],
            selector: selector,
            type: 'scale',
            style: 'transform:translateY',
            from: 1000,
            to: 0,
            unit: 'px'
          },
          {
            range: [1250, 1400],
            selector: selector,
            type: 'scale',
            style: 'opacity',
            from: 0,
            to: 1
          },
          {
            range: [1350, 1600],
            selector: selector,
            type: 'scale',
            style: 'border-width',
            from: 0,
            to: 15,
            unit: 'px'
          },
          {
            range: [1200, 1600],
            selector: '.screen.screen-2 .scene-2 .line',
            type: 'scale',
            style: 'height',
            from: 5,
            to: 30,
            unit: 'px'
          },
          {
            range: [1200, 1500],
            selector: '.screen.screen-2 .scene-2 .line',
            type: 'scale',
            style: 'width',
            from: 0,
            to: 70,
            unit: 'px'
          }
        ]
      }
    );
  }


  const promises = [];
  for (let i = 1; i <= 6; i++) {
    promises.push(generateTileChoreographer(i));
  }
  promises.push(generateYesChoreographer())

  const choreographers = await Promise.all(promises);
  window.addEventListener('scroll', () => {
    for (let i = 0; i < choreographers.length; i++) {
      choreographers[i].runAnimationsAt(window.pageYOffset);
    }
  })

}

let clientY = 0;
const setupScene3 = async () => {
    const sceneCh = new Choreographer({
      animations: [
        {
          range: [[2100, 2300], [2400, 2300]],
          selector: '.screen.screen-3 .data .hider',
          type: 'scale',
          style: 'translate:scaleX',
          from: 0,
          to: 1
        },
        {
          range: [2300, 2800],
          selector: '.screen.screen-3 .data .hider',
          type: 'change',
          style: 'transform-origin',
          to: 'right'
        },
        {
          range: [2300, 2301],
          selector: '.screen.screen-3 .data .second',
          type: 'scale',
          style: 'opacity',
          from: 0,
          to: 1
        },
        {
          range: [2300, 2301],
          selector: '.screen.screen-3 .data .first',
          type: 'scale',
          style: 'opacity',
          from: 1,
          to: 0
        }
      ]
    });

    const mouseCh = new Choreographer({
        animations: [
          {
            range: [[0, window.innerWidth / 2], [window.innerWidth, window.innerWidth / 2]],
            selector: '.screen.screen-3 .scene-1',
            type: 'scale',
            style: 'opacity',
            from: 0.3,
            to: 1
          },
          {
            range: [0, window.innerWidth],
            selector: '.screen.screen-3 .scene-2 .content-1 .tile-1',
            type: 'scale',
            style: 'transform:translateX',
            from: -1 * window.innerWidth - 50,
            to: -50,
            unit: 'px'
          },
          {
            range: [0, window.innerWidth],
            selector: '.screen.screen-3 .scene-2 .content-1 .tile-2',
            type: 'scale',
            style: 'transform:translateX',
            from: 50,
            to: window.innerWidth + 50,
            unit: 'px'
          },
          {
            range: [0, window.innerWidth],
            selector: '.screen.screen-4 .container',
            type: 'scale',
            style: 'transform:translateX',
            from: -32,
            to: window.innerWidth - 32,
            unit: 'px'
          }
        ]
    });
    const mouseChY = new Choreographer({
      animations: [
        {
          range: [3600, 3900],
          selector: '.screen.screen-4 .container',
          type: 'scale',
          style: 'transform:translateY',
          from: -50,
          to: 250,
          unit: 'px'
        },
        {
          range: [3600, 3900],
          selector: '.screen.screen-4 .container',
          type: 'scale',
          style: 'transform:scale',
          from: 0.5,
          to: 2
        }
      ]
    })
  window.addEventListener('scroll', () => {
    sceneCh.runAnimationsAt(window.pageYOffset);
    mouseChY.runAnimationsAt(clientY + window.pageYOffset);
  });
  window.addEventListener('mousemove', (e) => {
    mouseCh.runAnimationsAt(e.clientX);
    clientY = e.clientY;
    mouseChY.runAnimationsAt(e.pageY);
  })
}
console.log(window.pageYOffset);
setupScene1();
setupScene3();
