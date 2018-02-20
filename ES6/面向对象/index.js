/**
 * Created by 62354 on 2018/2/20.
 */
class ClassTest {
    constructor() {
        console.log('我创建了');
    }
    fun1() {
        console.log('fun1');
    }
    static fun2() {
        console.log('2')
    }
}

new ClassTest().fun1();
ClassTest.fun2();