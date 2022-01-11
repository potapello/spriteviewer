var cvs = document.getElementById("spritepreview");
var ctx = cvs.getContext("2d");

//
// ADD SPRITE CLASSES
class char {
    constructor(id, name, dresses, emotes, def_em, accs) {
        this.id = id; this.name = name; this.dresses = dresses; this.emotes = emotes; 
        this.def_em = def_em; this.accs = accs;
        this.path = `/${id}/${id}_`
    }
};
class dress {constructor(id, name) {this.id = id; this.name = name}};
class emote {constructor(id, pose) {this.id = id; this.pose = pose}};
class dist {constructor(id, name, offset) {this.id = id; this.name = name; this.offset = offset}};
//
// LET STUFF
let sp_version = `1.0`;
let from_github = true;

let far = new dist(`far`, `Далеко`, 60);
let normal = new dist(`normal`, `Норма`, -50);
let close = new dist(`close`, `Близко`, -160);

let active_sp =             0;
let active_dr =             1;
let active_em =             9;
let active_ac =             0;
let active_ds =             normal;
let dist_offset =           normal.offset;
let sp_anch_x =             660;
let global_time =           Number(0);
let delta_time =            Number(0);
let freq_time =             Number(0);
let freq_frames =           Number(0);

let int_grad = ctx.createLinearGradient(0, 0, 740, 0);
int_grad.addColorStop(0, '#74FEF8');
int_grad.addColorStop(0.8, '#CEFFFD');
int_grad.addColorStop(1, '#ffffff');
//
//          LET FULL LIBRARY OF DRESSES & EMOTES OF CHARACTERS
//          DV => ALISA
//          DRESSES
let dv_body = new dress(`body`, `Голое тело`);
let dv_coat = new dress(`coat`, `Пальто`);
let dv_pioneer = new dress(`pioneer`, `Пионерская форма`);
let dv_pioneer2 = new dress(`pioneer2`, `Пионерская форма 2`);
let dv_swim = new dress(`swim`, `Купальник`);
let dv_civil = new dress(`civil`, `Гражданская`);
let dv_pibody = new dress(`pibody`, `Пират`);
let dv_pibody2 = new dress(`pibody2`, `Пират 2`);
let dv_sport = new dress(`sport`, `Спортивная форма`);
let dv_rose = new dress(`rose`, `Роза`);

let dv_dresses = [dv_body, dv_pioneer, dv_coat, dv_pioneer2, dv_swim, dv_civil, dv_pibody, 
    dv_pibody2, dv_sport,];
let dv_accs = [null, dv_rose,];
//          EMOTES
let dv_cry = new emote(`cry`, `1`);
let dv_scared = new emote(`scared`, `1`);
let dv_shocked = new emote(`shocked`, `1`);
let dv_surprise = new emote(`surprise`, `1`);
let dv_grin = new emote(`grin`, `2`);
let dv_guilty = new emote(`guilty`, `3`);
let dv_sad = new emote(`sad`, `3`);
let dv_shy = new emote(`shy`, `3`);
let dv_laugh = new emote(`laugh`, `4`);
let dv_normal = new emote(`normal`, `4`);
let dv_smile = new emote(`smile`, `4`);
let dv_angry = new emote(`angry`, `5`);
let dv_rage = new emote(`rage`, `5`);
let dv_closed_eyes = new emote(`closed_eyes`, `3`);

let dv_emotes = [dv_cry, dv_scared, dv_shocked, dv_surprise, dv_grin, dv_guilty, dv_sad,
    dv_shy, dv_laugh, dv_normal, dv_smile, dv_angry, dv_rage, dv_closed_eyes,];
//
//          SL => SLAVYA
//          DRESSES
let sl_body = new dress(`body`, `Голое тело`);
let sl_pioneer = new dress(`pioneer`, `Пионерская форма`);
let sl_sport = new dress(`sport`, `Спортивная форма`);
let sl_dress = new dress(`dress`, `Платье`);
let sl_swim = new dress(`swim`, `Купальник`);

let sl_dresses = [sl_body, sl_pioneer, sl_dress, sl_sport, sl_swim,];
//          EMOTES
let sl_normal = new emote(`normal`, `1`);
let sl_serious = new emote(`serious`, `1`);
let sl_smile = new emote(`smile`, `1`);
let sl_happy = new emote(`happy`, `2`);
let sl_laugh = new emote(`laugh`, `2`);
let sl_shy = new emote(`shy`, `2`);
let sl_smile2 = new emote(`smile2`, `2`);
let sl_angry = new emote(`angry`, `3`);
let sl_sad = new emote(`sad`, `3`);
let sl_surprise = new emote(`surprise`, `3`);
let sl_scared = new emote(`scared`, `4`);
let sl_tender = new emote(`tender`, `4`);

let sl_emotes = [sl_normal, sl_serious, sl_smile, sl_happy, sl_laugh, sl_shy, sl_smile2,
    sl_angry, sl_sad, sl_surprise, sl_scared, sl_tender,];
//
//          MI => MIKU
//          DRESSES
let mi_body = new dress(`body`, `Голое тело`);
let mi_pioneer = new dress(`pioneer`, `Пионерская форма`);
let mi_swim = new dress(`swim`, `Купальник`);

let mi_dresses = [mi_body, mi_pioneer, mi_swim,];
//          EMOTES
let mi_cry = new emote(`cry`, `1`);
let mi_dontlike = new emote(`dontlike`, `1`);
let mi_laugh = new emote(`laugh`, `1`);
let mi_scared = new emote(`scared`, `1`);
let mi_shocked = new emote(`shocked`, `1`);
let mi_shy = new emote(`shy`, `1`);
let mi_surprise = new emote(`surprise`, `1`);
let mi_cry_smile = new emote(`cry_smile`, `2`);
let mi_grin = new emote(`grin`, `2`);
let mi_happy = new emote(`happy`, `2`);
let mi_sad = new emote(`sad`, `2`);
let mi_smile = new emote(`smile`, `2`);
let mi_angry = new emote(`angry`, `3`);
let mi_normal = new emote(`normal`, `3`);
let mi_rage = new emote(`rage`, `3`);
let mi_serious = new emote(`serious`, `3`);
let mi_upset = new emote(`upset`, `3`);

let mi_emotes = [mi_cry, mi_dontlike, mi_laugh, mi_scared, mi_shocked, mi_shy, mi_surprise, mi_cry_smile,
    mi_grin, mi_happy, mi_sad, mi_smile, mi_angry, mi_normal, mi_rage, mi_serious, mi_upset,];
//
//          UN => LENA
//          DRESSES
let un_body = new dress(`body`, `Голое тело`);
let un_pioneer = new dress(`pioneer`, `Пионерская форма`);
let un_sport = new dress(`sport`, `Спортивная форма`);
let un_dress = new dress(`dress`, `Платье`);
let un_swim = new dress(`swim`, `Купальник`);

let un_dresses = [un_body, un_pioneer, un_sport, un_dress, un_swim,];
//          EMOTES
let un_angry = new emote(`angry`, `1`);
let un_evil_smile = new emote(`evil_smile`, `1`);
let un_normal = new emote(`normal`, `1`);
let un_shy = new emote(`shy`, `1`);
let un_smile = new emote(`smile`, `1`);
let un_smile2 = new emote(`smile2`, `1`);
let un_cry = new emote(`cry`, `2`);
let un_cry_smile = new emote(`cry_smile`, `2`);
let un_sad = new emote(`sad`, `2`);
let un_scared = new emote(`scared`, `2`);
let un_shocked = new emote(`shocked`, `2`);
let un_surprise = new emote(`surprise`, `2`);
let un_angry2 = new emote(`angry2`, `3`);
let un_grin = new emote(`grin`, `3`);
let un_laugh = new emote(`laugh`, `3`);
let un_rage = new emote(`rage`, `3`);
let un_serious = new emote(`serious`, `3`);
let un_smile3 = new emote(`smile3`, `3`);

let un_emotes = [un_angry, un_evil_smile, un_normal, un_shy, un_smile, un_smile2, un_cry, un_cry_smile, un_sad,
    un_scared, un_shocked, un_surprise, un_angry2, un_grin, un_laugh, un_rage, un_serious, un_smile3,];
//
//          US => ULYANA
//          DRESSES
let us_body = new dress(`body`, `Голое тело`);
let us_pioneer = new dress(`pioneer`, `Пионерская форма`);
let us_sport = new dress(`sport`, `Спортивная форма`);
let us_dress = new dress(`dress`, `Платье`);
let us_swim = new dress(`swim`, `Купальник`);

let us_dresses = [us_body, us_pioneer, us_sport, us_dress, us_swim,];
//          EMOTES
let us_grin = new emote(`grin`, `1`);
let us_laugh = new emote(`laugh`, `1`);
let us_laugh2 = new emote(`laugh2`, `1`);
let us_normal = new emote(`normal`, `1`);
let us_sad = new emote(`sad`, `1`);
let us_smile = new emote(`smile`, `1`);
let us_angry = new emote(`angry`, `2`);
let us_calml = new emote(`calml`, `2`);
let us_dontlike = new emote(`dontlike`, `2`);
let us_fear = new emote(`fear`, `2`);
let us_upset = new emote(`upset`, `2`);
let us_cry = new emote(`cry`, `3`);
let us_cry2 = new emote(`cry2`, `3`);
let us_shy = new emote(`shy`, `3`);
let us_shy2 = new emote(`shy2`, `3`);
let us_surp1 = new emote(`surp1`, `3`);
let us_surp2 = new emote(`surp2`, `3`);
let us_surp3 = new emote(`surp3`, `3`);

let us_emotes = [us_grin, us_laugh, us_laugh2, us_normal, us_sad, us_smile, us_angry, us_calml, us_dontlike,
    us_fear, us_upset, us_cry, us_cry2, us_shy, us_shy2, us_surp1, us_surp2, us_surp3,];
// 
//          UV => ULYA
//          DRESSES
let uv_body = new dress(`body`, `Голое тело`);
let uv_pioneer = new dress(`pioneer`, `Платье?`);

let uv_dresses = [uv_pioneer, uv_pioneer,];
//          EMOTES
let uv_dontlike = new emote(`dontlike`, `1`);
let uv_rage = new emote(`rage`, `1`);
let uv_sad = new emote(`sad`, `1`);
let uv_shocked = new emote(`shocked`, `1`);
let uv_normal = new emote(`normal`, `2`);
let uv_smile = new emote(`smile`, `2`);
let uv_grin = new emote(`grin`, `3`);
let uv_laugh = new emote(`laugh`, `3`);
let uv_surprise2 = new emote(`surprise2`, `3`);
let uv_guilty = new emote(`guilty`, `4`);
let uv_surprise = new emote(`surprise`, `4`);
let uv_upset = new emote(`upset`, `4`);

let uv_emotes = [uv_dontlike, uv_rage, uv_sad, uv_shocked, uv_normal, uv_smile, uv_grin, uv_laugh, uv_surprise2,
    uv_guilty, uv_surprise, uv_upset,];
//
//          MT => OLGA
//          DRESSES & ACCS
let mt_body = new dress(`body`, `Голое тело`);
let mt_pioneer = new dress(`pioneer`, `Пионерская форма`);
let mt_dress = new dress(`dress`, `Платье`);
let mt_swim = new dress(`swim`, `Купальник`);
let mt_panama = new dress(`panama`, `Панама`);

let mt_dresses = [mt_body, mt_pioneer, mt_dress, mt_swim,];
let mt_accs = [null, mt_panama,];
//          EMOTES
let mt_normal = new emote(`normal`, `1`);
let mt_sad = new emote(`sad`, `1`);
let mt_smile = new emote(`smile`, `1`);
let mt_surprise = new emote(`surprise`, `1`);
let mt_angry = new emote(`angry`, `2`);
let mt_rage = new emote(`rage`, `2`);
let mt_shocked = new emote(`shocked`, `2`);
let mt_grin = new emote(`grin`, `3`);
let mt_laugh = new emote(`laugh`, `3`);
let mt_scared = new emote(`scared`, `3`);

let mt_emotes = [mt_normal, mt_sad, mt_smile, mt_surprise, mt_angry, mt_rage, mt_shocked, mt_grin,
    mt_laugh, mt_scared,];
//
//          EL => ELECTRONIK
//          DRESSES
let el_body = new dress(`body`, `Голое тело`);
let el_pioneer = new dress(`pioneer`, `Пионерская форма`);

let el_dresses = [el_body, el_pioneer,];
//          EMOTES
let el_grin = new emote(`grin`, `1`);
let el_normal = new emote(`normal`, `1`);
let el_smile = new emote(`smile`, `1`);
let el_fingal = new emote(`fingal`, `2`);
let el_sad = new emote(`sad`, `2`);
let el_scared = new emote(`scared`, `2`);
let el_shocked = new emote(`shocked`, `2`);
let el_surprise = new emote(`surprise`, `2`);
let el_upset = new emote(`upset`, `2`);
let el_angry = new emote(`angry`, `3`);
let el_laugh = new emote(`laugh`, `3`);
let el_serious = new emote(`serious`, `3`);

let el_emotes = [el_grin, el_normal, el_smile, el_fingal, el_sad, el_scared, el_shocked, el_surprise,
    el_upset, el_angry, el_laugh, el_serious,];
//
//          SH => SHURIK
//          DRESSES
let sh_body = new dress(`body`, `Пионерская форма`);

let sh_dresses = [sh_body, sh_body,];
//          EMOTES
let sh_laugh = new emote(`laugh`, `1`);
let sh_scared = new emote(`scared`, `1`);
let sh_smile = new emote(`smile`, `1`);
let sh_upset = new emote(`upset`, `1`);
let sh_cry = new emote(`cry`, `2`);
let sh_normal_smile = new emote(`normal_smile`, `2`);
let sh_rage = new emote(`rage`, `2`);
let sh_normal = new emote(`normal`, `3`);
let sh_serious = new emote(`serious`, `3`);
let sh_surprise = new emote(`surprise`, `3`);

let sh_emotes = [sh_laugh, sh_scared, sh_smile, sh_upset, sh_cry, sh_normal_smile, sh_rage, sh_normal,
    sh_serious, sh_surprise,];
//
//          CS => VIOLA
//          DRESSES & ACCS
let cs_body = new dress(`body`, `Голое тело`);
let cs_halat = new dress(`halat`, `Халат`);
let cs_civil = new dress(`civil`, `Гражданская`);
let cs_civil2 = new dress(`civil2`, `Гражданская 2`);
let cs_dress = new dress(`dress`, `Платье`);
let cs_panties = new dress(`panties`, `Трусики`);
let cs_swim = new dress(`swim`, `Купальник`);
let cs_glasses = new dress(`glasses`, `Очки в руке`);
let cs_stethoscope = new dress(`stethoscope`, `Стетоскоп`);

let cs_dresses = [cs_body, cs_halat, cs_civil, cs_civil2, cs_dress, cs_panties, cs_swim,];
let cs_accs = [null, cs_glasses, cs_stethoscope,];
//          EMOTES
let cs_normal = new emote(`normal`, `1`);
let cs_sad = new emote(`sad`, `1`);
let cs_shy = new emote(`shy`, `1`);
let cs_smile = new emote(`smile`, `1`);

let cs_emotes = [cs_normal, cs_sad, cs_shy, cs_smile,];
//
//          MZ => ZHENYA
//          DRESSES & ACCS
let mz_body = new dress(`body`, `Голое тело?`);
let mz_pioneer = new dress(`pioneer`, `Пионерская форма`);
let mz_dress = new dress(`dress`, `Платье`);
let mz_sport = new dress(`sport`, `Спортивная форма`);
let mz_glasses = new dress(`glasses`, `Очки`);
let mz_mask = new dress(`mask`, `Маска`);

let mz_dresses = [mz_body, mz_pioneer, mz_dress, mz_sport,];
let mz_accs = [null, mz_glasses, mz_mask,];
//          EMOTES
let mz_bukal = new emote(`bukal`, `1`);
let mz_laugh = new emote(`laugh`, `1`);
let mz_normal = new emote(`normal`, `1`);
let mz_angry = new emote(`angry`, `2`);
let mz_rage = new emote(`rage`, `2`);
let mz_shy = new emote(`shy`, `3`);
let mz_smile = new emote(`smile`, `3`);

let mz_emotes = [mz_bukal, mz_laugh, mz_normal, mz_angry, mz_rage, mz_shy, mz_smile,];
//
// LET CHAR OBJECTS
let dv = new char(`dv`, `Алиса`, dv_dresses, dv_emotes, 9, dv_accs);
let sl = new char(`sl`, `Славя`, sl_dresses, sl_emotes, 0, false);
let mi = new char(`mi`, `Мику`, mi_dresses, mi_emotes, 13, false);
let un = new char(`un`, `Лена`, un_dresses, un_emotes, 2, false);
let us = new char(`us`, `Ульяна`, us_dresses, us_emotes, 3, false);
let uv = new char(`uv`, `Юля`, uv_dresses, uv_emotes, 4, false);
let mt = new char(`mt`, `Ольга`, mt_dresses, mt_emotes, 0, mt_accs);
let el = new char(`el`, `Электроник`, el_dresses, el_emotes, 1, false);
let sh = new char(`sh`, `Шурик`, sh_dresses, sh_emotes, 7, false);
let cs = new char(`cs`, `Виола`, cs_dresses, cs_emotes, 0, cs_accs);
let mz = new char(`mz`, `Женя`, mz_dresses, mz_emotes, 2, mz_accs);
// let pi = new char(`pi`, `Пионер`); <= Ради 3-х эмоций?

let all_char = [dv, sl, mi, un, us, uv, mt, el, sh, cs, mz,];
// TODO >> ALL_CHAR >> [7dl, bkrr];
//
//          SPRITE ASSEMBLING MACHINE
//
// LET ACTIVES
let image_path =            ``;
let acc_name =              ``;

let act_pose =              null;
let act_body =              new Image();
let act_dress_id =          null;
let act_dress =             new Image();
let act_emote_id =          null;
let act_emote =             new Image();
let act_acc_id =            null;
let act_acc =               new Image();

let body_src_err =          false;
let dress_src_err =         false;
let emote_src_err =         false;
let acc_src_err =           false;
//
// LET FUNCTION
sam(); function sam() {
    // TIME FOR FPS
    if(freq_time < 9) {freq_time++; delta_time += (Math.floor(performance.now()) - global_time)}
    else {freq_time=0; freq_frames=delta_time; delta_time=(Math.floor(performance.now()) - global_time)}
    global_time = Math.floor(performance.now());
    // EXAMINE POSE FROM EMOTE
    act_pose = all_char[active_sp].emotes[active_em].pose;
    image_path = `sprites/${active_ds.id}${all_char[active_sp].path}${act_pose}_`;
    github_path = `https://github.com/potapello/spriteviewer/blob/main/sprites/${active_ds.id}${all_char[active_sp].path}${act_pose}_`
    if(from_github) {
        // PATH TO BODY
        if(!body_src_err) {act_body.src = github_path + `body.png?raw=true`; body_src_err=false};
        // PATH TO DRESS
        if(all_char[active_sp].dresses[active_dr].id != `body`) {
            act_dress_id = all_char[active_sp].dresses[active_dr].id;
            if(!dress_src_err) {act_dress.src = github_path + act_dress_id + `.png?raw=true`; dress_src_err=false};
        };
        // PATH TO EMOTE
        act_emote_id = all_char[active_sp].emotes[active_em].id;
        if(!emote_src_err) {act_emote.src =  github_path + act_emote_id + `.png?raw=true`; emote_src_err=false}
        // PATH TO ACCESORIES
        if(all_char[active_sp].accs != false && active_ac != 0) {
            act_acc_id = all_char[active_sp].accs[active_ac].id;
            act_acc.src = github_path + act_acc_id + `.png?raw=true`;
        }
    } else {
        // PATH TO BODY
        if(!body_src_err) {act_body.src = image_path + `body.png`; body_src_err=false};
        // PATH TO DRESS
        if(all_char[active_sp].dresses[active_dr].id != `body`) {
            act_dress_id = all_char[active_sp].dresses[active_dr].id;
           if(!dress_src_err) {act_dress.src = image_path + act_dress_id + `.png`; dress_src_err=false};
        };
        // PATH TO EMOTE
        act_emote_id = all_char[active_sp].emotes[active_em].id;
        if(!emote_src_err) {act_emote.src =  image_path + act_emote_id + `.png`; emote_src_err=false}
        // PATH TO ACCESORIES
        if(all_char[active_sp].accs != false && active_ac != 0) {
            act_acc_id = all_char[active_sp].accs[active_ac].id;
            act_acc.src = image_path + act_acc_id + `.png`;
        }
    };
    // DRAWING SPRITE
    //          DRAWING BACKGROUND
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 1440, 1080); // white background
    ctx.fillStyle=int_grad; ctx.fillRect(0, 0, 740, 1080); // blue gradient
    //          DRAWING BODY
    ctx.fillStyle = "#ff0000"; ctx.font = "20px Helvetica";
    if(act_body.height != 0) {ctx.drawImage(act_body, dist_offset+sp_anch_x, 0)}
    else {ctx.fillText(`Нет изображения тела!`, 20, 520)}; // body_src_err=true
    //ctx.drawImage(act_body, dist_offset+sp_anch_x, 0);
    //          DRAWING DRESS
    if(all_char[active_sp].dresses[active_dr].id != `body`) {
        if(act_dress.height != 0) {ctx.drawImage(act_dress, dist_offset+sp_anch_x, 0)}
        else {ctx.fillText(`Нет изображения одежды!`, 20, 540)}; // dress_src_err=true
        //ctx.drawImage(act_dress, dist_offset+sp_anch_x, 0);
    };
    //          DRAWING ACCS
    if(all_char[active_sp].accs != false && active_ac != 0) {
        if(act_acc.height != 0) {ctx.drawImage(act_acc, dist_offset+sp_anch_x, 0)}
        else {ctx.fillText(`Нет изображения аксессуара!`, 20, 560)}; // acc_src_err=true
        //ctx.drawImage(act_acc, dist_offset+sp_anch_x, 0);
    };
    //          DRAWING EMOTE
    if(act_emote.height != 0) {ctx.drawImage(act_emote, dist_offset+sp_anch_x, 0)}
    else {ctx.fillText(`Нет изображения эмоции!`, 20, 580)}; // emote_src_err=true
    //ctx.drawImage(act_emote, dist_offset+sp_anch_x, 0);
    //
    // DRAWING INFO ABOUT SPRITE
    ctx.fillStyle = "#000000"; ctx.font = "bold 40px Helvetica";
    ctx.fillText(`Персонаж: ${all_char[active_sp].name}`, 20, 120);
    ctx.fillText(`Поза: ${act_pose}`, 20, 160);
    ctx.fillText(`Одежда: ${all_char[active_sp].dresses[active_dr].name}`, 20, 200);
    ctx.fillText(`Эмоция: ${all_char[active_sp].emotes[active_em].id}`, 20, 240);
    ctx.fillText(`Расстояние: ${active_ds.name}`, 20, 280);
    if(all_char[active_sp].accs != false) {
        if(active_ac != 0) {acc_name=all_char[active_sp].accs[active_ac].name} else {acc_name=`Не выбран`}} 
        else {acc_name = `Не имеются`};
    ctx.fillText(`Аксессуар: ${acc_name}`, 20, 320);
    ctx.fillText(`RenPy-код спрайта:`, 20, 400); 
    ctx.fillStyle = "#003399"; ctx.font = "bold 28px Helvetica";
    ctx.fillText(`show ${all_char[active_sp].id} ${
        all_char[active_sp].emotes[active_em].id} ${
        all_char[active_sp].dresses[active_dr].id} ${
        active_ds.id}`, 20, 440);
    //
    // AUTHOR
    ctx.fillStyle = "#000099"; ctx.font = "bold 40px Helvetica";
    ctx.fillText(`Sprite Preview - by potapello`, 20, 960);
    ctx.fillStyle = "#000055";
    ctx.fillText(`ver. ${sp_version}`, 20, 1000);
    ctx.fillStyle = "#000033"; ctx.font = "20px Helvetica";
    ctx.fillText(`Наводите на слова над кнопками для доп. информации`, 20, 1040);
    ctx.fillText(`~FPS = ${Math.floor(100000/freq_frames)/10}`, 20, 1065);
    // REQUEST
    requestAnimationFrame(sam);
};
//
// SWITCH FUNCTIONS
//
function next_dr() {
    if(active_dr+1 < all_char[active_sp].dresses.length) {active_dr++} else {active_dr=0};
    src_err_clr()
};
function prev_dr() {
    if(active_dr > 0) {active_dr--} else {active_dr=all_char[active_sp].dresses.length-1};
    src_err_clr()
};
//
function next_em() {
    if(active_em+1 < all_char[active_sp].emotes.length) {active_em++} else {active_em=0};
    src_err_clr()
};
function prev_em() {
    if(active_em > 0) {active_em--} else {active_em=all_char[active_sp].emotes.length-1};
    src_err_clr()
};
//
function updat_sp() {active_dr = 1; dist_nr(); active_ac = 0};
function todef_em() {active_em = all_char[active_sp].def_em; src_err_clr()};
//
function next_sp() {
    updat_sp(); if(active_sp+1 < all_char.length) {active_sp++} else {active_sp=0;}; todef_em();
};
function prev_sp() {
    updat_sp(); if(active_sp > 0) {active_sp--} else {active_sp=all_char.length-1;}; todef_em();
};
//
function dist_cl() {active_ds=close; dist_offset = close.offset; src_err_clr()};
function dist_nr() {active_ds=normal; dist_offset = normal.offset; src_err_clr()};
function dist_fr() {active_ds=far; dist_offset = far.offset; src_err_clr()};
//
function next_ac() {
    if(all_char[active_sp].accs != false) {
        if(active_ac+1 < all_char[active_sp].accs.length) {active_ac++} else {active_ac=0}; src_err_clr()}};
function prev_ac() {
    if(all_char[active_sp].accs != false) {
        if(active_ac > 0) {active_ac--} else {active_ac=all_char[active_sp].accs.length-1}; src_err_clr()}};
//
function src_err_clr() {
    body_src_err=false; dress_src_err=false; acc_src_err=false; emote_src_err=false;
};