import { self } from 'react-native-workers';


self.onmessage = (data) => {

    let back_track_paths = [],
        back_track = false;
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data.length; j++) {
            if(data[i][j] === 0 || back_track) {
                let num = data[i][j] + 1;
                while(num <= 9 && !(_check_row(num, i, data) && _check_column(num, j, data))) {
                    ++num
                }
                if(num === 10) {
                    this.data[i][j] = 0;
                    if(back_track_paths.length === 0) {
                        self.postMessage('failed!');
                        return;
                    } else {
                        [i, j] = back_track_paths.pop();
                        j--;
                        back_track = true
                    }
                } else {
                    data[i][j] = num;
                    back_track_paths.push([i, j]);
                    back_track = false
                }
            }
        }
    }
    self.postMessage(data)
};

function _check_row(num, i, data) {
    for(let j = 0; j < data[i].length; j++) {
        if(data[i][j] === num) {
            return false
        }
    }
    return true;
}

function _check_column(num, j, data) {
    for(let i = 0; i < data.length; i++) {
        if(data[i][j] === num) {
            return false
        }
    }
    return true;
}