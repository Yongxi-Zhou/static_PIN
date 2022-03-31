window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';

    })
    preview_img.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        // 1.鼠标在大盒子内部移动,先获得鼠标在大盒子的坐标，再把坐标赋值给里面的盒子
    preview_img.addEventListener('mousemove', function(e) {
        // x、 y是鼠标在大盒子里的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // 2.获得遮挡层的移动时左上角的坐标，同时也是小盒子移动的距离，x->left , y-> top，利用鼠标的坐标得到遮挡层的坐标
        var maskY = y - mask.offsetHeight / 2;
        var maskX = x - mask.offsetWidth / 2;
        console.log(maskX, maskY);
        // 3.遮挡层不能超出小图片盒子范围,注意数据类型。

        if (maskX <= 0) {
            mask.style.left = 0;
        } else if (maskX > preview_img.offsetWidth - mask.offsetWidth) {
            // 如果移动距离比最大移动距离大，就让他等于最大移动距离
            mask.style.left = preview_img.offsetWidth - mask.offsetWidth + 'px';
        } else {
            mask.style.left = maskX + 'px';
        }
        if (maskY <= 0) {
            mask.style.top = 0;
        } else if (maskY > preview_img.offsetWidth - mask.offsetWidth) {
            // 如果移动距离比最大移动距离大，就让他等于最大移动距离
            mask.style.top = preview_img.offsetWidth - mask.offsetWidth + 'px';
        } else {
            mask.style.top = maskY + 'px';
        }
        // 4.大图片等比例移动的距离
        // 大图片移动的距离 = （大图max移/小图max移）* 小盒子移动的距离
        var maskMax = big.children[0].offsetWidth - big.offsetWidth;
        var maskSm = preview_img.offsetWidth - mask.offsetWidth;

        big.children[0].style.left = -maskMax / maskSm * maskX + 'px';
        big.children[0].style.top = -maskMax / maskSm * maskY + 'px';
    })

})