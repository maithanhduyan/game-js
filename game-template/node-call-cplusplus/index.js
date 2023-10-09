const sha256 = require('./sha256')
const path = require('path');
const { exec } = require('child_process');
const { log } = require('console');
const cplusplusPath = path.join(__dirname, './cplusplus/hello'); // Đường dẫn đầy đủ đến chương trình C++
// console.log(cplusplusPath.toString());

// exec(cplusplusPath, (error, stdout, stderr) => {
//     const startTime = Date.now();
//     if (error) {
//         console.error(`Lỗi: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`Lỗi chuẩn lỗi: ${stderr}`);
//         return;
//     }
//     console.log(`Kết quả: ${stdout}`);
//     const endTime = Date.now();
//     const elapsedTime = endTime - startTime;
//     console.log(`Thời gian thực thi: ${elapsedTime}ms`);
// });





// const strhash = 'abc';
// console.log(sha256(strhash));

const cplusplusPath1 = path.join(__dirname, './cplusplus/sha256 abc'); // Đường dẫn đầy đủ đến chương trình C++

exec(cplusplusPath1, (error, stdout, stderr) => {
    const startTime1 = Date.now();
    if (error) {
        console.error(`Lỗi: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Lỗi chuẩn lỗi: ${stderr}`);
        return;
    }
    console.log(`Kết quả c++: ${stdout}`);
    const endTime1 = Date.now();
    const elapsedTime1 = endTime1 - startTime1;
    console.log(`Thời gian thực thi c++: ${elapsedTime1}ms`);
});