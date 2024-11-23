function readURL(input, id_div_img) {
    if (id_div_img !== configEditor.imageID) {
        return false;
    }

    //   showLoading();

    let cnt = input.target.files.length;

    for (i = 0; i <= cnt; i++) {
        if (input.target.files && input.target.files[i]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById(
                    id_div_img
                ).style.background = `url('${e.target.result}')`;
                document.getElementById(
                    id_div_img
                ).style.backgroundSize = `cover`;
                document.getElementById(id_div_img).style.backgroundRepeat =
                    "no-repeat";
                mm = e.target.result;
                setThumb(id_div_img, mm);
            };
            reader.readAsDataURL(input.target.files[i]); // convert to base64 string
        }
    }
    document.getElementById("img-file").value = "";
}
