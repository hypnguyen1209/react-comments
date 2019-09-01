document.addEventListener('DOMContentLoaded', ()=>{
    async function checklive(token){
        let result = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${token}`);
        return result.json();
    }
    async function getid_comment(id, token){
        let result = await fetch(`https://graph.facebook.com/${id}/comments?fields=id&limit=5000&access_token=${token}`);
        return result.json();
    }
    var stm = document.getElementById('submit');
    stm.addEventListener('click',()=>{
        const ACCESS_TOKEN = document.getElementById('access_token').value;
        var ID = document.getElementById('post').value;
        var REACT = document.querySelectorAll('h4')[2].childNodes[1].innerHTML;
            if(ACCESS_TOKEN && ID && REACT){
                console.log(true);
                var check = checklive(ACCESS_TOKEN)
                .then(res0=>{
                    if(res0.id && res0.name){
                        toastr_comment();
                    }else{
                        toastr.error('Invalid ACCESS_TOKEN', {timeOut: 3000});
                    }
                })
                .catch(err0=>{
                    console.log(err);
                })
                function toastr_comment(){
                    var get_comment = getid_comment(ID, ACCESS_TOKEN)
                    .then(res1=>{
                        var length_comment = res1.data.length;
                        toastr.info(`Found: ${length_comment}`, {timeOut: 3000});
                    })
                    .catch(err1=>{
                        console.log(err);
                    })
                }
            }else if(!ACCESS_TOKEN){
                toastr.error('ACCESS_TOKEN null', {timeOut: 3000});
            }else if(!ID){
                toastr.error('ID POST null', {timeOut: 3000});
            }else if(!REACT){
                toastr.error('You have not chosen emotions', {timeOut: 3000});
            }

    })
}, false)