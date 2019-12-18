module.exports = {
  name: 'ngx-light-editor',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-light-editor',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
