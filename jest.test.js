// 用例：case，每个case都测一个独立的功能点
test('test common matcher', ()=>{
    expect(2+2).toBe(4)
})
test('test tobe true or false', ()=>{
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})