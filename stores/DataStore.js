import { observable, action} from 'mobx'
import data from './suduku_data.json'

class DataStore {

    // the current suduku puzzle
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

    // back track paths is used to 'remember' the empty entries
    _back_track_paths = [];

    // all suduku puzzles available
    _numbers;

    constructor() {
        this._numbers = data['numbers']
    }

    @action
    solve() {
        return new Promise((resolve, reject) => {
            let back_track = false;
            for(let i = 0; i < this.data.length; i++) {
                for(let j = 0; j < this.data.length; j++) {
                    if(this.data[i][j] === 0 || back_track) {
                        let num = this.data[i][j] + 1;
                        while(num <= 9 && !(this._check_row(num, i) && this._check_column(num, j))) {
                            ++num
                        }
                        if(num === 10) {
                            this.data[i][j] = 0;
                            if(this._back_track_paths.length === 0) {
                                reject('Failed!');
                            } else {
                                [i, j] = this._back_track_paths.pop();
                                j--;
                                back_track = true
                            }
                        } else {
                            this.data[i][j] = num;
                            this._back_track_paths.push([i, j]);
                            back_track = false
                        }
                    }
                }
            }
            resolve('Success!');
        });
    }

    @action
    reset() {
        while(this._back_track_paths.length !== 0) {
            let [i, j] = this._back_track_paths.pop();
            this.data[i][j] = 0
        }
    }

    @action
    change() {
        //get a random number from the list and convert it into a flat decimal list
        let num = this._numbers[Math.floor(Math.random()*this._numbers.length)],
            digits = num.trim().split('').map((n) => parseInt(n));

        if(digits.length === 81) {
            let new_data = [];
            while(digits.length > 0) {
                new_data.push(digits.splice(0,9))
            }
            this.data = new_data
        } else {
            this.data = [
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
        }

        //clear the back track paths from previous number
        this._back_track_paths = [];

        // //get the least significant digit one after the other
        // while(num !== 0){
        //     digit = num % 10;
        //     digits.push(digit);
        //     num = Math.floor(num / 10)
        // }
        // //padding the missing digit
        // if(digits.length < 81) {
        //     let paddings = 81 - digits.length;
        //     while(paddings > 0) {
        //         digits.push(0);
        //         paddings--
        //     }
        // }
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

}


const dataStore = new DataStore();
export default dataStore;