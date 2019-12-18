module.exports = {
  name: 'ngx-light-editor-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-light-editor-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
