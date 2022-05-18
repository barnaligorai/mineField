const isEqual = require('assert').deepStrictEqual;

const assert = (actual, expected, message) => {
  let status = '✅';
  try {
    isEqual(actual, expected, message);
  } catch (error) {
    status = '❌';
    throw error;
  } finally {
    console.log(status, message);
  }
};

const printReport = ({failedCases, ...result}) => {
  console.table(result);
  if (failedCases.length > 0) {
    console.log('failed cases ----');
    for (const message of failedCases) {
      console.log('❌ :',message);
    }
  }
};

const createReport = testCases => {
  const report = {failedCases : []};
  for (let test of testCases) {
    try {
      assert(...test);
      report.passed = (report.passed + 1 || 1);
    } catch (error) {
      report.failed = (report.failed + 1 || 1);
      report.failedCases.push(error.message);
    }
    report.total = (report.total + 1 || 1);
  }
  printReport(report);
};

exports.createReport = createReport;