import { groups } from "./trial_data/groups";

function CopyJsonInputToBatch() {
  let error_counter = 0;
  const data = {
    "condition-bool": Array(groups.length).fill(true),
    "condition-counter": Array(groups.length).fill(0),
  };
  const dataFields = Object.keys(data);

  function initBatchData(key, value) {
    if (!jatos.batchSession.defined("/" + key)) {
      return jatos.batchSession.set(key, value);
    }
    return Promise.resolve();
  }

  function CopyKeyValue(index) {
    if (index < dataFields.length) {
      const key = dataFields[index];
      initBatchData(key, data[key])
        .then(function () {
          error_counter = 0;
          CopyKeyValue(index + 1);
        })
        .catch(function (e) {
          error_counter += 1;
          if (error_counter > 2) {
            console.error(e);
            return;
          }
          CopyKeyValue(index);
        });
    }
  }

  CopyKeyValue(0);
}

jatos.onLoad(function () {
  CopyJsonInputToBatch();
  const p_ID =
    jatos.urlQueryParameters.PROLIFIC_PID !== undefined
      ? jatos.urlQueryParameters.PROLIFIC_PID.substring(0, 6)
      : "NOPID";
  jatos.startNextComponent(null, p_ID);
});
