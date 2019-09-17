document.addEventListener('DOMContentLoaded', ()=>{
    async function checklive(token){
        let result = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${token}`);
        return result.json();
    }
    async function getid_comment(id, token){
        let result = await fetch(`https://graph.facebook.com/${id}/comments?fields=id&limit=5000&access_token=${token}`);
        return result.json();
    }
    async function react_comments(id_comment, token){
        let result = await fetch(`https://graph.facebook.com/v4.0/${id_comment}/reactions?type=WOW&method=post&access_token=${token}`);
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
                        
                        for(let i = 0; i < length_comment; i++){
                            let id_cmt = res1.data[i].id;
                            if(id_cmt.split('_')[1]){
                                fetch(`https://graph.facebook.com/v4.0/${id_cmt}/reactions?type=${REACT}&method=post&access_token=${ACCESS_TOKEN}`)
                           
                            }else{
                                fetch(`https://graph.facebook.com/v4.0/${ID}_${id_cmt}/reactions?type=${REACT}&method=post&access_token=${ACCESS_TOKEN}`)
                           
                            }
                        }
                       setTimeout(()=>{
                        toastr.info(`Done!`, {timeOut: 3000});
                       }, 6000);
                    })
                    .catch(err1=>{
                        console.log(err1);
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
