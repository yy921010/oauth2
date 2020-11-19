const { isEmpty } = require('./tool');
describe('empty test', () => {
  it('it is true', () => {
    expect(isEmpty(null)).toBeTruthy();
  });

  it('it is false',()=>{
    expect(isEmpty({name:1})).toBeFalsy()
  })
});
