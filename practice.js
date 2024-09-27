//var reqURL = 'http://52.79.186.236:8443/api';
var reqURL = 'http://egtn.iptime.org:8443/api';
//var reqURL = 'http://192.168.0.101:8443/api';
var KAKAO_URL = 'http://52.79.186.236:8443/oauth/kakao';
var menuData = [];

///////////////////////////////////////////

  function SingIn(ID,PW) {
    var data1 = { userId : ID , userPassword : PW };
    //console.log("[data1] : " + JSON.stringify(data1));
    var SingInURL = reqURL + '/login';
    $.ajax({    			 //api 호출
        url: SingInURL,
        type: 'POST',
        dataType: "json", 
        contentType: "application/json",
        data : JSON.stringify(data1), //json 데이터
        async: true, // 비동기 여부
        timeout: 5000, // 타임 아웃 설정
                        
      success: function(data, textStatus, xhr) {
          var access = xhr.getResponseHeader('accesstoken');
          var refresh = xhr.getAllResponseHeaders('refreshtoken');
          
          console.log('data: ' + JSON.stringify(data));
          if (access && refresh) {
              sessionStorage.setItem('accessToken', access);
              sessionStorage.setItem('refreshtokentoken', refresh);
              var menuRole =  data.payload.menuRole;
            for(var i = 0; i < menuRole.length; i ++) {
                var test = 
                {
                  menuName : menuRole[i].menuName ,
                  menuId : menuRole[i].menuId ,
                  useYn : menuRole[i].useYn ,
                  permit_c : menuRole[i].permit.c ,
                  permit_r : menuRole[i].permit.r ,
                  permit_u : menuRole[i].permit.u ,
                  permit_d : menuRole[i].permit.d ,
                }
                console.log(test);
                menuData.push(test);
            }
            sessionStorage.setItem('menuData', JSON.stringify(menuData));
            location.href="../main/main.html";
          } else {
              alert('로그인 성공했으나 accessToken을 받지 못했습니다.');
          }
      },
      error: function(error) {
          alert('로그인 실패: ' + JSON.stringify(error));
      },
    });
  }
  
function Station_List_Check(){

    var SingInURL = reqURL + '/station/info/list';
    
    $.ajax({    			
        url: SingInURL,
        type: "GET",
        dataType: "json", 
        contentType: "application/json",
        //data : JSON.stringify(data213), //json 데이터
        async: true, // 비동기 여부
        timeout: 5000, // 타임 아웃 설정
                        
        // [응답 확인 부분] 
        success: function(response) {
            console.log("[requestPostBodyJson] : [response] : " + JSON.stringify(response));
        },
        complete: function(data,textStatus){
            console.log("[complete1] : " + textStatus);
            console.log("[complete2] : " + JSON.stringify(data).toString());
        }
    });
}

function Wh_JSONformat(value_data)
{
  value_data = (value_data / 1000).toFixed(3).toString() + ' kWh';
  return value_data;
}

function Wh_JSONformat_tmp(value_data)
{
  var return_data = '';
  const str = JSON.stringify(value_data);
  const n = str.length -3;
 
  if(n > 0)
  {
    return_data = str.slice(0, n) + '.' + str.slice(n) + ' kWh';
  }
  else 
  {
    return_data = '0.' + str + ' kWh'
  }

  return return_data;
}

function won_JSONformat(value_data)
{
    return value_data + ' 원';
}

function SOC_JSONformat(value_data)
{
    return value_data + ' %';
}



function OAuth_Login(){
//    console.log("URL " + KAKAO_URL + '/code');
    var response_data ="";
    $.ajax({    			
        url: KAKAO_URL + '/code',
        type: "GET",
        dataType: "json", 
        //data : JSON.stringify(data1), //json 데이터
        contentType: "application/json",
        timeout: 5000, // 타임 아웃 설정
        async: false,

        beforeSend: function (xhr) {
          //  console.log("[xhr] : " + JSON.stringify(xhr));
        },
        success: function(data, textStatus, xhr) {
        //  console.log("[data] : " + JSON.stringify(data.payload));
     //     alert(data.payload);
          response_data = JSON.stringify(data.payload).toString();
        },
        error: function(error) {
            alert('실패: ' + error.responseText);
        },
        complete: function(data,textStatus){
           // console.log("[complete1] : " + textStatus);
           // console.log("[complete2] : " + JSON.stringify(data).toString());
        }
    });
    response_data = response_data.substring(1, response_data.length - 1);
    //console.log("[response_data] : " + response_data);


    return response_data;

    //var data = "https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth%2Fkakao%2Fcallback&through_account=true&client_id=18025adf362493528111b73573cb1d29";
}
let openWin;
function OAuth_callBack(url){
    var windowFeatures = "location=no,directories=no,resizable=no,status=no,toolbar=no, popup";
    openWin = window.open(url, "_blank", windowFeatures);
}

const LoginReturn = () => {
    useEffect(() => {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");
      console.log(authorizationCode); //인증 코드
    });
}

function SingIn_test(ID,PW) {
  var data1 = { userId : ID , userPassword : PW };
    var SingInURL = reqURL + '/login';
  $.ajax({    			
      url: SingInURL,
      type: 'POST',
      dataType: "json", 
      contentType: "application/json",
      data : JSON.stringify(data1), //json 데이터
      async: true, // 비동기 여부
      timeout: 5000, // 타임 아웃 설정
                      
    success: function(data, textStatus, xhr) {
        var access = xhr.getResponseHeader('accesstoken');
        var refresh = xhr.getAllResponseHeaders('refreshtoken');
        if (access && refresh) {
            sessionStorage.setItem('accessToken', access);
            sessionStorage.setItem('refreshtokentoken', refresh);
            var menuRole =  data.payload.menuRole;
            for(var i = 0; i < menuRole.length; i ++) {
                var test = 
                {
                  menuName : menuRole[i].menuName ,
                  menuId : menuRole[i].menuId ,
                  useYn : menuRole[i].useYn ,
                  permit_c : menuRole[i].permit.c ,
                  permit_r : menuRole[i].permit.r ,
                  permit_u : menuRole[i].permit.u ,
                  permit_d : menuRole[i].permit.d ,
                }
                menuData.push(test);
            }
            sessionStorage.setItem('menuData', JSON.stringify(menuData));
            console.log("data : " + JSON.stringify(menuData));
            location.href="../test/main test.html";
            location.href="../role/role.html";

            //URL 데이터 이동
            //let queryString = "?array=" + encodeURIComponent(JSON.stringify(menuData));
            //location.href="../test/main test.html"+ queryString;
        } else {
          console.log("accessToken을 받지 못했습니다.");
        }
    },
    error: function(error) {
      console.log('로그인 실패: ' + JSON.stringify(error));
    },
  });
}

function href_link(item) {
  var href ="";
   switch(item)
   {
     case "대시보드" :
     href = "../main/main.html";
     break;
     case "설치위치 MAP" :
     href = "";
     break;
     case "권한관리" :
     href = "../role/role.html";
     break;
     case "시스템 코드 관리" :
     href = "";
     break;
     case "시스템 변수 설정" :
     href = "";
     break;
     case "개인정보" :
     href = "";
     break;
     case "개인정보 변경" :
     href = "";
     break;
     case "비밀번호 변경" :
     href = "";
     break;
     case "CPO 관리" :
     href = "../cpo/cpoManagement.html";
     break;
     case "CPO ID 관리" :
     href = "../cpo/cpoID.html";
     break;
     case "제조 공장 관리" :
     href = "../management/chargerFactory.html";
     break;
     case "충전기 모델 관리" :
     href = "../management/chargerModel.html";
     break;
     case "충전기 단가 등록" :
     href = "../management/chargerCost.html";
     break;
     case "충전기 단가 설정" :
     href = "";
     break;
     case "충전소 관리" :
     href = "../station/station.html";
     break;
     case "충전기 관리" :
     href = "../charger/charger.html";
     break;
     case "충전기 정보" :
     href = "";
     break;
     case "충전기 설정" :
     href = "";
     break;
     case "펌웨어 관리" :
     href = "";
     break;
     case "충전기 로컬인증" :
     href = "";
     break;
     case "충전기 프로파일 설정" :
     href = "";
     break;
     case "충전기 고객문의" :
     href = "";
     break;
     case "충전기 AS관리" :
     href = "";
     break;
     case "충전 내역 관리" :
     href = "../charging/charging.html";
     break;
     case "충전량 그래프" :
     href = "";
     break;
     case "결제 내역 관리" :
     href = "";
     break;
     case "회원관리" :
     href = "../member/member.html";
     break;
     case "회원카드 관리" :
     href = "../member/memberCard.html";
     break;
     default :
     href = "";
     break;
   }
 return href;
 }
