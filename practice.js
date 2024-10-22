//var reqURL = 'http://52.79.186.236:8443/api';
var reqURL = 'https://egtn.iptime.org:8443/api';
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
                  parentMenuId : menuRole[i].parentMenuId,
                  sort : menuRole[i].sort
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

function USEYN_JSONformat(value_data){
  if(value_data == "Y"){
    value_data = "사용" ;
  }
  else if(value_data == "N"){
    value_data = "미사용";
  }
  return value_data;
}

function NULL_JSONformat(value_data){
  if(value_data == "null"){
    value_data = "없음"
  }
  return value_data;
}

function QUANTITY_JSONformat(value_data){
  return value_data + '개'
}

function DELETEYN_JSONformat(value_data){
  if(value_data == "Y"){
    value_data = "예";
  }
  else if(value_data == "N"){
    value_data = "아니오";
  }
  return value_data;
}

function STOPCARD_JSONformat(value_data){
  if(value_data == "N"){
    value_data = "정지";
  }
  else if(value_data == "Y"){
    value_data = "사용중"
  }
  return value_data;
}

function ACCEPTED_JSONformat(value_data){
  if(value_data == "Accepted"){
    value_data = "수락됨";
  }
  else if(value_data == "Blocked"){
    value_data = "차단";
  }
  else{
    value_data == "오류";
  }
  return value_data;
}

function validateEmail(email_address) {     
  var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return email_regex.test(email_address); 
}

function validateNumber(Number){
  var Number_regex = /^[0-9]+$/; // 하나 이상의 숫자를 허용
  return Number_regex.test(Number);
}


function validateCheck(){
  // input의 id값(email)으로 작성된 내용을 가져옴.
  var emailAddress = document.getElementById("input-email");
  var numbers = document.querySelectorAll(".input-number");
  
  var email = emailAddress.value;

  var errorMessages = []; 

  // 이메일 주소 유효성 검사
  if (!validateEmail(email)) {
    errorMessages.push("유효하지 않은 이메일 주소입니다.");
  }

  // 전화번호 유효성 검사
  numbers.forEach((number) => {
    let callNumber = number.value; // let으로 선언
    if (!validateNumber(callNumber)) {
      errorMessages.push("번호는 숫자만 입력해주세요.");
    }
  });
  // 오류 메시지가 있을 경우 한 번에 표시
  if (errorMessages.length > 0) {
    alert(errorMessages.join("\n\n")); // 줄 바꿈으로 메시지 연결
  }
}

function validateMemberCard(){
  var cardNumber = document.getElementsByName("cardNumber");
  if(!validateNumber(cardNumber)){
    alert("카드 번호는 숫자만 입력해주세요.");
    return false; // 유효하지 않으면 전송을 막음
  }
  return true; // 유효하면 전송 가능
}

function validatePassword(newPassword, newPasswordConfirm) {
  if (newPassword !== newPasswordConfirm) {
    alert("새로운 패스워드가 일치하지 않습니다.");
    return false; // 일치하지 않으면 false 반환
  }
  return true; // 일치하면 true 반환
}

function validatePasswordCheck() {
  var userNewPassword = document.getElementsByName("userNewPassword")[0].value;
  var userNewPasswordConfirm = document.getElementsByName("userNewPasswordConfirm")[0].value;

  if (!validatePassword(userNewPassword, userNewPasswordConfirm)) {
    return false; // 패스워드가 일치하지 않으면 이후 동작 중단
  }

  // 패스워드가 일치하는 경우에만 다음 동작을 실행
  // 예를 들어, AJAX 요청을 진행하거나 폼을 제출할 수 있습니다.
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
     case "충전 요금 등록" :
     href = "../management/chargerCost.html";
     break;
     case "충전 요금 설정" :
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
//메뉴 항목 표시 함수
 function createNavMenu(navItems) {
  const navMenu = document.getElementById('navMenu');

  navItems.forEach((item, index) => {
      if (index === 6 || index === 7) return;  // 특정 항목 건너뛰기
      if (index >= 16 && index <= 22) return;  // 특정 항목 건너뛰기

      const ul = document.createElement('ul');
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item;
      a.href = href_link(item);  // 링크 설정
      li.appendChild(a);

      if (index === 5) {
          const nestedUl = document.createElement('ul');
          [6, 7].forEach(subIndex => {
              const nestedLi = document.createElement('li');
              const nestedA = document.createElement('a');
              nestedA.textContent = navItems[subIndex];
              nestedA.href = href_link(navItems[subIndex]);
              nestedLi.appendChild(nestedA);
              nestedUl.appendChild(nestedLi);
          });
          li.appendChild(nestedUl);
      }

      if (index === 15) {
          const nestedUl = document.createElement('ul');
          for (let i = 16; i <= 22; i++) {
              const nestedLi = document.createElement('li');
              const nestedA = document.createElement('a');
              nestedA.textContent = navItems[i];
              nestedA.href = href_link(navItems[i]);
              nestedLi.appendChild(nestedA);
              nestedUl.appendChild(nestedLi);
          }
          li.appendChild(nestedUl);
      }

      ul.appendChild(li);
      navMenu.appendChild(ul);
  });
}
//사이드바 열고 닫기 함수
function initializeSidebar() {
  const sidebar = document.querySelector('.side-bar');
  const toggleIcon = document.getElementById('toggle-sidebar');
  const mainContent = document.querySelector('main'); // 메인 콘텐츠 선택
  let isSidebarVisible = JSON.parse(localStorage.getItem('isSidebarVisible')) || false; // 로컬스토리지에서 상태 가져오기
  mainContent.style.width = 'calc(100% - var(--side-bar-width) * 0.2)'; // 초기 상태에서 메인 콘텐츠 너비 조정

  // 초기 사이드바 상태 설정
  if (isSidebarVisible) {
      sidebar.style.transform = 'translate(0, 0)';
      mainContent.style.width = '88%'; // 메인 콘텐츠 너비 원래대로
      sidebar.style.overflowY = 'auto'; // 사이드바가 열릴 때 스크롤 활성화
  } else {
      sidebar.style.transform = `translate(calc(var(--side-bar-width) * -0.8), 0)`;
      mainContent.style.width = 'calc(100% - var(--side-bar-width) * 0.2)'; // 메인 콘텐츠 너비 늘리기
      sidebar.style.overflowY = 'hidden'; // 사이드바가 닫힐 때 스크롤 비활성화
  }

  // 토글 아이콘 클릭 이벤트
  toggleIcon.addEventListener('click', function() {
      if (isSidebarVisible) {
          // 사이드바 숨기기
          sidebar.style.transform = `translate(calc(var(--side-bar-width) * -0.8), 0)`;
          mainContent.style.width = 'calc(100% - var(--side-bar-width) * 0.2)'; // 메인 콘텐츠 넓이 늘리기
          isSidebarVisible = false;
          sidebar.style.overflowY = 'hidden'; // 사이드바가 닫힐 때 스크롤 비활성화
      } else {
          // 사이드바 보이기
          sidebar.style.transform = 'translate(0, 0)';
          mainContent.style.width = '88%'; // 메인 콘텐츠 넓이 원래대로
          isSidebarVisible = true;
          sidebar.style.overflowY = 'auto'; // 사이드바가 열릴 때 스크롤 활성화
      }
      localStorage.setItem('isSidebarVisible', isSidebarVisible); // 상태 저장
  });
}
 
