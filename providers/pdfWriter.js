

const writeHTML = async (res, context, data) => {
    const log = context.logger.start(`provders:pdfWriter:writeHTML`);
    let html = await res.render('pdf', {
        info: data,
    })
    return html
}

exports.writeHTML = writeHTML
// res.render('pdf', {
//     info: mappedPdfData,
// }, function (err, HTML) {
//     if (err) {
//         console.log('err to read', err)
//     }
//     else {

//         fs.unlink('./pdfUploads/score.pdf', (err => {
//             if (err) console.log(err);
//             else {
//                 console.log("\nDeleted file: example_file.txt");
//                 // Get the files in current directory
//                 // after deletion
//                 //   getFilesInDirectory();
//             }
//         }));
//     }