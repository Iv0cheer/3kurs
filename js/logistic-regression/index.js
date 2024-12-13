/**
 * In this web app, we'll fit a logistic regression model to predict the outcome of a toy dataset.
 */

// Dataset's url
const csvUrl = 'https://gist.githubusercontent.com/juandes/ba58ef99df9bd719f87f807e24f7ea1c/raw/59f57af034c52bd838c513563a3e547b3650e7ba/lr-dataset.csv';
let dataset;

let model;

async function defineAndTrainModel(numberEpochs, accuracyTh) {
  const numOfFeatures = (await dataset.columnNames()).length - 1;
  const trainingSurface = { name: 'Loss и MSE', tab: 'Training' };

  const flattenedDataset = dataset
    .map(({ xs, ys }) => ({ xs: Object.values(xs), ys: Object.values(ys) }))
    .batch(10)
    .shuffle(100, 17);

  model = tf.sequential();
  model.add(tf.layers.dense({
    inputShape: [numOfFeatures],
    units: 1,
    activation: 'sigmoid',
  }));

  model.compile({
    optimizer: tf.train.adam(0.1),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  model.summary();

  let ach = -1;

  await model.fitDataset(flattenedDataset, {
    epochs: numberEpochs,
    callbacks: [
      tfvis.show.fitCallbacks(
        trainingSurface,
        ['loss', 'acc'],
        { callbacks: ['onEpochEnd'] },
      ),
      {
        onEpochEnd: async (epoch, logs) => {
          console.log(`${epoch}:${logs.loss}`);
          if (logs.acc >= accuracyTh && ach === -1) {
            ach = epoch + 1;
          }
        },
      },
      {
        onTrainEnd: async () => {
          console.log('Обучение модели завершено.');
          if (ach === -1) {
            alert(`Пороговое значение точности ${accuracyTh} НЕ БЫЛО достигнуто за ${numberEpochs} эпох.`);
          } else {
            alert(`Пороговое значение точности ${accuracyTh} было достигнуто на эпохе ${ach}.`);
          }
        },
      }],
  });

  model.predict(tf.tensor2d([[0.1773208878849, -1.447465411302]])).print();
  model.predict(tf.tensor2d([[-1.58566906881, 1.91762229933]])).print();
}

function loadData() {
  // Our target variable (what we want to predict) is the column 'label' (wow, very original),
  // so we specify it in the configuration object as the label
  dataset = tf.data.csv(
    csvUrl, {
      columnConfigs: {
        label: {
          isLabel: true,
        },
      },
    },
  );
}

async function visualizeDataset() {
  // tfjs-vis surface's names and tabs
  const dataSurface = { name: 'Scatterplot', tab: 'Errors' };
  const classZero = [];
  const classOne = [];

  await dataset.forEachAsync((e) => {
    // Extract the features from the dataset
    const features = { x: e.xs.feature_1, y: e.xs.feature_2 };
    // If the label is 0, add the features to the "classZero" array
    if (e.ys.label === 0) {
      classZero.push(features);
    } else {
      classOne.push(features);
    }
  });

  // Specify the name of the labels. This will show up in the chart's legend.
  const series = ['Class 0', 'Class 1'];
  const dataToDraw = { values: [classZero, classOne], series };

  tfvis.render.scatterplot(dataSurface, dataToDraw, {
    xLabel: 'feature_1',
    yLabel: 'feature_2',
    zoomToFit: true,
  });
}

async function visualizePredictionErrors() {
  const dataSurface = { name: 'Prediction Errors', tab: 'Errors' };
  const errors = [];

  const last40Data = await dataset.take(40).toArray();
  const xs = last40Data.map(d => Object.values(d.xs));
  const ys = last40Data.map(d => d.ys.label);

  const xsTensor = tf.tensor2d(xs, [xs.length, xs[0].length]);
  const predictions = model.predict(xsTensor);
  const predArray = await predictions.array();

  predArray.forEach((pred, index) => {
    const actual = ys[index];
    const predictedLabel = pred[0] >= 0.5 ? 1 : 0;
    errors.push({ x: pred[0], y: actual, predicted: predictedLabel });
  });

  const series = ['Correct', 'Incorrect'];
  const correct = errors.filter(e => e.y === e.predicted);
  const incorrect = errors.filter(e => e.y !== e.predicted);

  const dataToDraw = {
    values: [
      correct.map(e => ({ x: e.x, y: e.y })),
      incorrect.map(e => ({ x: e.x, y: e.y })),
    ],
    series,
  };

  tfvis.render.scatterplot(dataSurface, dataToDraw, {
    xLabel: 'Predicted Probability',
    yLabel: 'Actual Label',
    yDomain: [-0.2, 1.2],
  });

  // Создание текста для отображения неправильных предсказаний
  if (incorrect.length > 0) {
    const incorrectPredictionsText = incorrect.map(e => 
      `Predicted: ${e.predicted}, Actual: ${e.y}, Probability: ${e.x.toFixed(2)}`
    ).join('<br>');

    // Отображение текста под графиком
    const textSurface = { name: 'Incorrect Predictions', tab: 'Errors' };
    tfvis.render.text(textSurface, incorrectPredictionsText);
  } else {
    // Если нет неправильных предсказаний, отображаем соответствующее сообщение
    const noErrorsText = 'No incorrect predictions.';
    const textSurface = { name: 'Incorrect Predictions', tab: 'Errors' };
    tfvis.render.text(textSurface, noErrorsText);
  }
}


function createTrainButton() {
  const btn = document.createElement('BUTTON');
  btn.innerText = 'Обучить!';

  btn.addEventListener('click', () => {
    const numberEpochs = document.getElementById('number-epochs').value;
    const accuracyTh = document.getElementById('accuracy-threshold').value;
    console.log(`Количество эпох: ${numberEpochs}, Порог точности: ${accuracyTh}`);

    let errorMessage = '';

    if (parseFloat(accuracyTh) <= 0 || parseFloat(accuracyTh) > 1) {
      errorMessage += 'Порог точности должен быть в диапазоне от 0 до 1.\n';
    }

    if (parseInt(numberEpochs, 10) <= 0 || parseInt(numberEpochs, 10) > 20) {
      errorMessage += 'Количество эпох должно быть больше 0 и меньше 21.\n';
    }

    if (errorMessage) {
      alert(errorMessage);
    } else {
      defineAndTrainModel(parseInt(numberEpochs, 10), parseFloat(accuracyTh));
    }
  });

  document.querySelector('#train').appendChild(btn);
}


function createVisualizeButton() {
  const btn1 = document.createElement('BUTTON');
  btn1.innerText = 'Визуализировать набор данных!';
  btn1.addEventListener('click', () => {
    visualizeDataset();
  });
  document.querySelector('#visualize').appendChild(btn1);

  const btn2 = document.createElement('BUTTON');
  btn2.innerText = 'Визуализировать ошибки!';
  btn2.addEventListener('click', () => {
    if (!model ) {
      alert('Сначала обучите модель, прежде чем визуализировать ошибки!');
      return;
    } else {
    visualizePredictionErrors();
    }
  });
  document.querySelector('#vis').appendChild(btn2);
}

function init() {
  createTrainButton();
  createVisualizeButton();
  loadData();
}

init();
