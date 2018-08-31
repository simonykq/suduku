import {observable} from 'mobx'

export default class NavigationStore {
    @observable headerTitle = "Suduku";
    @observable.ref navigationState = {
        index: 0,
        routes: [
            { key: "Suduku", routeName: "Suduku" },
        ],
    }

    // NOTE: the second param, is to avoid stacking and reset the nav state
    @action dispatch = (action, stackNavState = true) => {
        const previousNavState = stackNavState ? this.navigationState : null;
        return this.navigationState = AppNavigator
            .router
            .getStateForAction(action, previousNavState);
    }
}