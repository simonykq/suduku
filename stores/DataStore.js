import { observable, action} from 'mobx'


class DataStore {

    @observable
    data = [
        [8, 5, 6, 0, 1, 4, 7, 3, 0],
        [0, 9, 0, 0, 0, 0, 0, 0, 0],
        [2, 4, 0, 0, 0, 0, 1, 6, 0],
        [0, 6, 2, 0, 5, 9, 3, 0, 0],
        [0, 3, 1, 8, 0, 2, 4, 5, 0],
        [0, 0, 5, 3, 4, 0, 9, 2, 0],
        [0, 2, 4, 0, 0, 0, 0, 7, 3],
        [0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 8, 6, 3, 0, 2, 9, 4]
    ];

    @action
    solve() {
        return new Promise((resolve, reject) => {
            let back_track_paths = [],
                back_track = false;
            for(let i = 0; i < this.data.length; i++) {
                for(let j = 0; j < this.data.length; j++) {
                    if(this.data[i][j] === 0 || back_track) {
                        let num = this.data[i][j] + 1;
                        while(num <= 9 && !(this._check_row(num, i) && this._check_column(num, j))) {
                            ++num
                        }
                        if(num === 10) {
                            this.data[i][j] = 0;
                            if(back_track_paths.length === 0) {
                                reject('failed!');
                            } else {
                                [i, j] = back_track_paths.pop();
                                j--;
                                back_track = true
                            }
                        } else {
                            this.data[i][j] = num;
                            back_track_paths.push([i, j]);
                            back_track = false
                        }
                    }
                }
            }
            resolve('success');
        });
    }

    _check_row(num, i) {
        for(let j = 0; j < this.data[i].length; j++) {
            if(this.data[i][j] === num) {
                return false
            }
        }
        return true;
    }

    _check_column(num, j) {
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i][j] === num) {
                return false
            }
        }
        return true;
    }

    @action
    change() {
        this.data = [
            [0, 0, 4, 3, 0, 0, 2, 0, 9],
            [0, 0, 5, 0, 0, 9, 0, 0, 1],
            [0, 7, 0, 0, 6, 0, 0, 4, 3],
            [0, 0, 6, 0, 0, 2, 0, 8, 7],
            [1, 9, 0, 0, 0, 7, 4, 0, 0],
            [0, 5, 0, 0, 8, 3, 0, 0, 0],
            [6, 0, 0 ,0, 0, 0, 1, 0, 5],
            [0, 0, 3, 5, 0, 8, 6, 9, 0],
            [0, 4, 2, 9, 1, 0, 3, 0, 0]
        ]
    }
}


const dataStore = new DataStore();
export default dataStore;