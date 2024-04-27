self.addEventListener('message',(e) => {
    const pixels = e.data.pixels;

    var mseR = 0;
    var mseG = 0;
    var mseB = 0;
    const numPixels = pixels.length / 4;
    for( let i = 0; i < pixels.length; i += 4 ) {
        rd = pixels[i];
        gd = pixels[i+1];
        bd = pixels[i+2];
        mseR += rd * rd;
        mseG += gd * gd;
        mseB += bd * bd;
    }
    const mse = ( mseR + mseG + mseB ) / 3 / numPixels;
    const maxI = 255
    const PSNR = 10 * Math.log10( maxI * maxI / mse );
    e.data.PSNR = PSNR;
    e.data.pixels = null; // avoid copying again
    self.postMessage(e.data);
}, false);