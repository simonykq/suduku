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
    solve(advanced = false) {
        return new Promise((resolve, reject) => {
            let solution = advanced ? this._solution_2() : this._solution_1();
            if(solution) {
                resolve({status: 'Succeeded!', message: `Time elapsed: ${solution} ms`});
            } else {
                reject({status: 'Failed!', message: 'No feasible solutions!'});
            }
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

    _solution_1() {
        let start_time = new Date();
        let back_track = false;
        for(let i = 0; i < this.data.length; i++) {
            for(let j = 0; j < this.data.length; j++) {
                if(this.data[i][j] === 0 || back_track) {
                    let num = this.data[i][j] + 1;
                    while(num <= 9 && !(this._check_row(num, i)
                        && this._check_column(num, j)
                        && this._check_grid(num, i, j))) {
                        ++num
                    }
                    if(num === 10) {
                        this.data[i][j] = 0;
                        if(this._back_track_paths.length === 0) {
                            return
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
        let end_time = new Date();
        return (end_time - start_time);
    }

    _solution_2() {
        let start_time = new Date();
        let empty_slots_with_counts = [];

        for(let i = 0; i < this.data.length; i++) {
            for(let j = 0; j < this.data.length; j++) {
                if(this.data[i][j] === 0) {
                    let count = this._get_empty_slots_in_row(i) + this._get_empty_slots_in_column(j)
                                                                + this._get_empty_slots_in_grid(i, j);
                    empty_slots_with_counts.push([[i, j], count])
                }
            }
        }

        let empty_slots = empty_slots_with_counts.sort((a, b) => {
            if(a[1] > b[1]) {
                return 1
            } else if (a[1] < b[1]) {
                return -1
            } else {
                return 0
            }
        }).map((item) => item[0]);

        while(empty_slots.length !== 0) {
            let [i, j] = empty_slots.pop(),
                num = this.data[i][j] + 1;
            while(num <= 9 && !(this._check_row(num, i)
                && this._check_column(num, j)
                && this._check_grid(num, i, j))){
                num++
            }
            if(num === 10) {
                this.data[i][j] = 0;
                if(this._back_track_paths.length === 0) {
                    return
                } else {
                    empty_slots.push([i, j]);
                    empty_slots.push(this._back_track_paths.pop());
                }
            } else {
                this.data[i][j] = num;
                this._back_track_paths.push([i, j]);
            }
        }

        let end_time = new Date();
        return (end_time - start_time);

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

    _check_grid(num, i, j) {
        let [num_i, num_j] = [Math.floor(i / 3), Math.floor(j / 3)];
        let [i_start, i_end] = [3*num_i, 3*(num_i + 1)],
            [j_start, j_end] = [3*num_j, 3*(num_j + 1)];
        for(let i = i_start; i < i_end; i++) {
            for (let j = j_start; j < j_end; j++) {
                if(this.data[i][j] === num) {
                    return false
                }
            }
        }
        return true;
    }

    _get_empty_slots_in_row(i) {
        let count = 0;
        for (let j = 0; j < this.data[i].length; j++) {
            if(this.data[i][j] === 0)
                count++
        }
        return count;
    }

    _get_empty_slots_in_column(j) {
        let count = 0;
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i][j] === 0)
                count++
        }
        return count;
    }

    _get_empty_slots_in_grid(i, j) {
        let [num_i, num_j] = [Math.floor(i / 3), Math.floor(j / 3)];
        let [i_start, i_end] = [3*num_i, 3*(num_i + 1)],
            [j_start, j_end] = [3*num_j, 3*(num_j + 1)];
        let count = 0;
        for(let i = i_start; i < i_end; i++) {
            for (let j = j_start; j < j_end; j++) {
                if(this.data[i][j] === 0)
                    count++
            }
        }
        return count;
    }

}


const dataStore = new DataStore();
export default dataStore;