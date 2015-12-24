/**
 * Created by duan on 2014/12/2.
 */
function util()
{
    return {
        getElement: function (id) {
            if (document.getElementById(id)) {
                return document.getElementById(id);
            }
            if (document.getElementsByName) {
                return document.getElementsByName(id);
            }
        }

    }
}