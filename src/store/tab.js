
import Cookie from 'js-cookie'
export default {
    state:{
        isCollapse:false,
        tabList:[{
            path:'/',
            name:'home',
            label:'首页',
            icon:'home',
        }],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        handleMenu(state){
            return state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
            if(val.name !== 'home'){
                state.currentMenu = val;
                const result = state.tabList.findIndex(item => item.name === val.name);
                if(result === -1){
                    state.tabList.push(val);
                }else{
                    state.currentMenu = null;
                }
            }
        },
        // closeTag(state,val){
        //     const result = state.tabList.findIndex(item => item.name === val.name)
        //     state.tabList.splice(result,1)
        // },
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach( item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () =>import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray);
            // 路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('main',item)
            })
            console.log(router);
        }
    }
}