
var cvs = document.getElementById("spritepreview");
var ctx = cvs.getContext("2d");
//
// ADD SPRITE CLASSES
class char {
        constructor(mode, id, name, dresses, emotes, def_em, accs, self_width) {
                this.id = id; this.name = name; this.dresses = dresses; this.emotes = emotes; 
                this.def_em = def_em; this.accs = accs; this.width = self_width;
                this.path = `/${id}/${id}_`; this.mode = mode;
        }
};
class dress {constructor(mode, id, name, self) {
    this.id = id; this.name = name; this.self = self; this.mode = mode;
}};
class emote {constructor(mode, id, pose) {this.id = id; this.pose = pose; this.mode = mode}};
class dist {constructor(id, name, offset) {
    this.id = id; this.name = name; this.offset = offset;
}};
//
// LET STUFF
let sp_version =            `web 1.4`;
let from_github =           true;
let sp_scale =              String(`comp2x`);
// SCALES => normal, comp2x, comp4x,
let timeout =               Number(8); // seconds
let censored =              String('Включена');
let to_scale =              String(`Включен`);
let sp_bgcolor =            String(`Светлая`);
let far =                   new dist(`far`, `Далеко`, 60);
let normal =                new dist(`normal`, `Норма`, -50);
let close =                 new dist(`close`, `Близко`, -160);
let active_sp =             11;
let active_dr =             1;
let active_em =             15;
let active_ac =             0;
let active_ds =             normal;
let dist_offset =           normal.offset;
let sp_anch_x =             660;
let global_time =           Number(0);
let delta_time =            Number(0);
let freq_time =             Number(0);
let freq_frames =           Number(0);
let download_ani =          String(``);
let ani_frames =            Number(0);

let int_grad = ctx.createLinearGradient(0, 0, 740, 0);
    int_grad.addColorStop(0, `rgba(14, 165, 229, 0.8)`);
    int_grad.addColorStop(0.8, `rgba(14, 165, 229, 0.3)`);
    int_grad.addColorStop(1, `rgba(14, 165, 229, 0)`);
//
//          LET MODIFICATIONS NAMES
let m = {
    bkrr: 'БКРР',
    sdl: '7 Дней Лета',
    smnt: 'Саманта',
};
//
//          LET FULL LIBRARY OF DRESSES & EMOTES OF CHARACTERS
//          DV => ALISA
//          DRESSES
let dv_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `pioneer`, `Пионерская форма`),
    new dress(false, `coat`, `Пальто`),
    new dress(false, `pioneer2`, `Пионерская форма 2`),
    new dress(false, `swim`, `Купальник`),
    new dress(m.bkrr, `civil`, `Гражданская`),
    new dress(m.bkrr, `pibody`, `Пират`, true),
    new dress(m.bkrr, `pibody2`, `Пират 2`, true),
    new dress(false, `sport`, `Спортивная форма`),
];
let dv_accs = [
    null, 
    new dress(m.bkrr, `rose`, `Роза`),
];
//          EMOTES
let dv_emotes = [
    new emote(false, `cry`, `1`),
    new emote(false, `scared`, `1`),
    new emote(false, `shocked`, `1`),
    new emote(false, `surprise`, `1`),
    new emote(false, `grin`, `2`),
    new emote(false, `guilty`, `3`),
    new emote(false, `sad`, `3`),
    new emote(false, `shy`, `3`),
    new emote(false, `laugh`, `4`),
    new emote(false, `normal`, `4`),
    new emote(false, `smile`, `4`),
    new emote(false, `angry`, `5`),
    new emote(false, `rage`, `5`),
    new emote(m.sdl, `closed_eyes`, `3`),
];
//
//          SL => SLAVYA
//          DRESSES
let sl_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `pioneer`, `Пионерская форма`),
    new dress(false, `sport`, `Спортивная форма`),
    new dress(false, `dress`, `Платье`),
    new dress(false, `swim`, `Купальник`),
];
//          EMOTES
let sl_emotes = [
    new emote(false, `normal`, `1`),
    new emote(false, `serious`, `1`),
    new emote(false, `smile`, `1`),
    new emote(false, `happy`, `2`),
    new emote(false, `laugh`, `2`),
    new emote(false, `shy`, `2`),
    new emote(false, `smile2`, `2`),
    new emote(false, `angry`, `3`),
    new emote(false, `sad`, `3`),
    new emote(false, `surprise`, `3`),
    new emote(false, `scared`, `4`),
    new emote(false, `tender`, `4`),
];
//
//          MI => MIKU
//          DRESSES
let mi_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `pioneer`, `Пионерская форма`),
    new dress(false, `swim`, `Купальник`),
];
//          EMOTES
let mi_emotes = [
    new emote(false, `cry`, `1`),
    new emote(false, `dontlike`, `1`),
    new emote(false, `laugh`, `1`),
    new emote(false, `scared`, `1`),
    new emote(false, `shocked`, `1`),
    new emote(false, `shy`, `1`),
    new emote(false, `surprise`, `1`),
    new emote(false, `cry_smile`, `2`),
    new emote(false, `grin`, `2`),
    new emote(false, `happy`, `2`),
    new emote(false, `sad`, `2`),
    new emote(false, `smile`, `2`),
    new emote(false, `angry`, `3`),
    new emote(false, `normal`, `3`),
    new emote(false, `rage`, `3`),
    new emote(false, `serious`, `3`),
    new emote(false, `upset`, `3`),
];
//
//          UN => LENA
//          DRESSES
let un_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `pioneer`, `Пионерская форма`),
    new dress(false, `sport`, `Спортивная форма`),
    new dress(false, `dress`, `Платье`),
    new dress(false, `swim`, `Купальник`),
];
//          EMOTES
let un_emotes = [
    new emote(false, `angry`, `1`),
    new emote(false, `evil_smile`, `1`),
    new emote(false, `normal`, `1`),
    new emote(false, `shy`, `1`),
    new emote(false, `smile`, `1`),
    new emote(false, `smile2`, `1`),
    new emote(false, `cry`, `2`),
    new emote(false, `cry_smile`, `2`),
    new emote(false, `sad`, `2`),
    new emote(false, `scared`, `2`),
    new emote(false, `shocked`, `2`),
    new emote(false, `surprise`, `2`),
    new emote(false, `angry2`, `3`),
    new emote(false, `grin`, `3`),
    new emote(false, `laugh`, `3`),
    new emote(false, `rage`, `3`),
    new emote(false, `serious`, `3`),
    new emote(false, `smile3`, `3`),
];
//
//          US => ULYANA
//          DRESSES
let us_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `pioneer`, `Пионерская форма`),
    new dress(false, `sport`, `Спортивная форма`),
    new dress(false, `dress`, `Платье`),
    new dress(false, `swim`, `Купальник`),
];
//          EMOTES
let us_emotes = [
    new emote(false, `grin`, `1`),
    new emote(false, `laugh`, `1`),
    new emote(false, `laugh2`, `1`),
    new emote(false, `normal`, `1`),
    new emote(false, `sad`, `1`),
    new emote(false, `smile`, `1`),
    new emote(false, `angry`, `2`),
    new emote(false, `calml`, `2`),
    new emote(false, `dontlike`, `2`),
    new emote(false, `fear`, `2`),
    new emote(false, `upset`, `2`),
    new emote(false, `cry`, `3`),
    new emote(false, `cry2`, `3`),
    new emote(false, `shy`, `3`),
    new emote(false, `shy2`, `3`),
    new emote(false, `surp1`, `3`),
    new emote(false, `surp2`, `3`),
    new emote(false, `surp3`, `3`),
];
// 
//          UV => ULYA
//          DRESSES
let uv_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `pioneer`, `Платье?`),
];
//          EMOTES
let uv_emotes = [
    new emote(false, `dontlike`, `1`),
    new emote(false, `rage`, `1`),
    new emote(false, `sad`, `1`),
    new emote(false, `shocked`, `1`),
    new emote(false, `normal`, `2`),
    new emote(false, `smile`, `2`),
    new emote(false, `grin`, `3`),
    new emote(false, `laugh`, `3`),
    new emote(false, `surprise2`, `3`),
    new emote(false, `guilty`, `4`),
    new emote(false, `surprise`, `4`),
    new emote(false, `upset`, `4`),
];
//
//          MT => OLGA
//          DRESSES & ACCS
let mt_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `pioneer`, `Пионерская форма`),
    new dress(false, `dress`, `Платье`),
    new dress(false, `swim`, `Купальник`),
];
let mt_accs = [
    null,
    new dress(false, `panama`, `Панама`),
];
//          EMOTES
let mt_emotes = [
    new emote(false, `normal`, `1`),
    new emote(false, `sad`, `1`),
    new emote(false, `smile`, `1`),
    new emote(false, `surprise`, `1`),
    new emote(false, `angry`, `2`),
    new emote(false, `rage`, `2`),
    new emote(false, `shocked`, `2`),
    new emote(false, `grin`, `3`),
    new emote(false, `laugh`, `3`),
    new emote(false, `scared`, `3`),
];
//
//          EL => ELECTRONIK
//          DRESSES
let el_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `pioneer`, `Пионерская форма`),
];
//          EMOTES
let el_emotes = [
    new emote(false, `grin`, `1`),
    new emote(false, `normal`, `1`),
    new emote(false, `smile`, `1`),
    new emote(false, `fingal`, `2`),
    new emote(false, `sad`, `2`),
    new emote(false, `scared`, `2`),
    new emote(false, `shocked`, `2`),
    new emote(false, `surprise`, `2`),
    new emote(false, `upset`, `2`),
    new emote(false, `angry`, `3`),
    new emote(false, `laugh`, `3`),
    new emote(false, `serious`, `3`),
];
//
//          SH => SHURIK
//          DRESSES
let sh_dresses = [
new dress(false, `body`, `Пионерская форма`),
new dress(false, `body`, `Пионерская форма`),
];
//          EMOTES
let sh_emotes = [
    new emote(false, `laugh`, `1`),
    new emote(false, `scared`, `1`),
    new emote(false, `smile`, `1`),
    new emote(false, `upset`, `1`),
    new emote(false, `cry`, `2`),
    new emote(false, `normal_smile`, `2`),
    new emote(false, `rage`, `2`),
    new emote(false, `normal`, `3`),
    new emote(false, `serious`, `3`),
    new emote(false, `surprise`, `3`),
];
//
//          CS => VIOLA
//          DRESSES & ACCS
let cs_dresses = [
    new dress(false, `body`, `Голое тело`),
    new dress(false, `halat`, `Халат`, true),
    new dress(m.bkrr, `civil`, `Гражданская`),
    new dress(m.bkrr, `civil2`, `Гражданская 2`),
    new dress(m.bkrr, `dress`, `Платье`),
    new dress(m.bkrr, `panties`, `Трусики`),
    new dress(m.bkrr, `swim`, `Купальник`),
];
let cs_accs = [
    null, 
    new dress(false, `glasses`, `Очки в руке`),
    new dress(false, `stethoscope`, `Стетоскоп`),
];
//          EMOTES
let cs_emotes = [
    new emote(false, `normal`, `1`),
    new emote(false, `sad`, `1`),
    new emote(false, `shy`, `1`),
    new emote(false, `smile`, `1`),
];
//
//          MZ => ZHENYA
//          DRESSES & ACCS
let mz_dresses = [
    new dress(false, `body`, `Голое тело?`),
    new dress(false, `pioneer`, `Пионерская форма`),
    new dress(m.bkrr, `dress`, `Платье`),
    new dress(m.bkrr, `sport`, `Спортивная форма`),
];
let mz_accs = [
    null,
    new dress(false, `glasses`, `Очки`),
    new dress(m.bkrr, `mask`, `Маска`),
];
//          EMOTES
let mz_emotes = [
    new emote(false, `bukal`, `1`),
    new emote(false, `laugh`, `1`),
    new emote(false, `normal`, `1`),
    new emote(false, `angry`, `2`),
    new emote(false, `rage`, `2`),
    new emote(false, `shy`, `3`),
    new emote(false, `smile`, `3`),
];
//
//          OWL => SOVA (FROM "Samantha mod")
//          DRESSES
let owl_dresses = [
    new dress(m.smnt, `body`, `Тело не нарисовано отдельно!`, true),
    new dress(m.smnt, `undr`, `Только куртка`, true),
    new dress(m.smnt, `dressed`, `Куртка с одеждой`, true),
    new dress(m.smnt, `hands`, `Куртка с перчатками`, true),
    new dress(m.smnt, `pioneer`, `Куртка с формой`, true),
    new dress(m.smnt, `skirt`, `Куртка с юбкой`, true),
];
//          EMOTES
let owl_emotes = [
    new emote(m.smnt, `laugh`, `1`),
    new emote(m.smnt, `scared`, `1`),
    new emote(m.smnt, `surprise`, `1`),
    new emote(m.smnt, `cry`, `2`),
    new emote(m.smnt, `cry2`, `2`),
    new emote(m.smnt, `guilty`, `2`),
    new emote(m.smnt, `guilty2`, `2`),
    new emote(m.smnt, `rage`, `2`),
    new emote(m.smnt, `rage2`, `2`),
    new emote(m.smnt, `sad`, `2`),
    new emote(m.smnt, `sad2`, `2`),
    new emote(m.smnt, `shy`, `2`),
    new emote(m.smnt, `shy2`, `2`),
    new emote(m.smnt, `upset`, `2`),
    new emote(m.smnt, `upset2`, `2`),
    new emote(m.smnt, `normal`, `3`),
    new emote(m.smnt, `smile`, `3`),
    new emote(m.smnt, `tender`, `3`),
    new emote(m.smnt, `unsure`, `3`),
    new emote(m.smnt, `widesmile`, `3`),
];
// LET CHAR OBJECTS
let dv      = new char(false,   `dv`,       `Алиса`,       dv_dresses,   dv_emotes,  9,   dv_accs);
let sl      = new char(false,   `sl`,       `Славя`,       sl_dresses,   sl_emotes,  0,   false);
let mi      = new char(false,   `mi`,       `Мику`,        mi_dresses,   mi_emotes,  13,  false);
let un      = new char(false,   `un`,       `Лена`,        un_dresses,   un_emotes,  2,   false);
let us      = new char(false,   `us`,       `Ульяна`,      us_dresses,   us_emotes,  3,   false);
let uv      = new char(false,   `uv`,       `Юля`,         uv_dresses,   uv_emotes,  4,   false);
let mt      = new char(false,   `mt`,       `Ольга`,       mt_dresses,   mt_emotes,  0,   mt_accs);
let el      = new char(false,   `el`,       `Электроник`,  el_dresses,   el_emotes,  1,   false);
let sh      = new char(false,   `sh`,       `Шурик`,       sh_dresses,   sh_emotes,  7,   false);
let cs      = new char(false,   `cs`,       `Виола`,       cs_dresses,   cs_emotes,  0,   cs_accs);
let mz      = new char(false,   `mz`,       `Женя`,        mz_dresses,   mz_emotes,  2,   mz_accs);
let owl     = new char(m.smnt,  `owl`,      `Сова`,        owl_dresses,  owl_emotes, 15,  false, -300);
//
let all_char = [dv, sl, mi, un, us, uv, mt, el, sh, cs, mz, owl,];
// TODO >> ALL_CHAR >> [7dl, bkrr];
//
//          SPRITE ASSEMBLING MACHINE
//
// LET ACTIVES
let image_path =            ``;
let acc_name =              ``;
let act_pose =              null;
//
let act_body =              new Image();
let act_dress_id =          null;
let act_dress =             new Image();
let act_emote_id =          null;
let act_emote =             new Image();
let act_acc_id =            null;
let act_acc =               new Image();
//
let body_src_time =         Number();
let dress_src_time =        Number();
let emote_src_time =        Number();
let acc_src_time =          Number();
//
let body_status =           false;
let dress_status =          false;
let emote_status =          false;
let acc_status =            false;
//
let red_dist_offset =       Number(900);
let red_sp_width =          Number(900);
//
let char_mode =             false;
let dress_mode =            false;
let emote_mode =            false;
let acc_mode =              false;
//
// LET FUNCTION
sam(); function sam() {
    //
    // AUTO-SCALE IN CLIENT
    if(to_scale == `Включен`) {
        if(document.documentElement.clientHeight < 1104 && document.documentElement.clientWidth >= 1700) {
            document.body.style.zoom = document.documentElement.clientHeight / 1104};
        if(document.documentElement.clientHeight >= 1104 && document.documentElement.clientWidth < 1700) {
            document.body.style.zoom = document.documentElement.clientWidth / 1700};
        if(document.documentElement.clientHeight <= 1104 && document.documentElement.clientWidth <=1700) {
            if(document.documentElement.clientHeight / 1104 <= document.documentElement.clientWidth / 1800) {
                document.body.style.zoom = document.documentElement.clientHeight / 1104} 
            else {document.body.style.zoom = document.documentElement.clientWidth / 1800}
        }
    } else {document.body.style.zoom = 1.0};
    //
    // TIME FOR FPS & ANIMATION
    if(freq_time < 9) {freq_time++; delta_time += (Math.floor(performance.now()) - global_time)}
    else {freq_time=0; ani_frames++; freq_frames=delta_time; delta_time=(Math.floor(performance.now()) - global_time)}
    global_time = Math.floor(performance.now());
    if(ani_frames > 11) {ani_frames=0};
    switch(ani_frames) {
        case 0: download_ani = `.`; break;
        case 3: download_ani = `..`; break;
        case 6: download_ani = `...`; break;
        case 9: download_ani = ``; break;
    };
    //
    // TESTING FOR MODDED CONTENT
    dress_mode =            false;
    emote_mode =            false;
    acc_mode =              false;
    char_mode =             false;
    if(all_char[active_sp].mode) {char_mode = all_char[active_sp].mode};
    if(all_char[active_sp].dresses[active_dr].mode) {dress_mode = all_char[active_sp].dresses[active_dr].mode};
    if(all_char[active_sp].emotes[active_em].mode) {emote_mode = all_char[active_sp].emotes[active_em].mode};
    if(active_ac != 0) {
        if(all_char[active_sp].accs[active_ac].mode) {acc_mode = all_char[active_sp].accs[active_ac].mode};
    };
    //
    // EXAMINE POSE FROM EMOTE
    act_pose = all_char[active_sp].emotes[active_em].pose;
    image_path = `sprites/${active_ds.id}${all_char[active_sp].path}${act_pose}_`;
    github_path = `https://github.com/potapello/spriteviewer/blob/main/sprites/${sp_scale}/${all_char[active_sp].path}${act_pose}_`
    //
    // PATH TO FILES FROM GITHUB
    if(from_github) {
            // PATH TO BODY
            if(body_src_time < timeout*60 && !all_char[active_sp].dresses[active_dr].self) {
                act_body.src = github_path + `body.png?raw=true`};
            // PATH TO DRESS
            if(all_char[active_sp].dresses[active_dr].id != `body`) {
                    act_dress_id = all_char[active_sp].dresses[active_dr].id;
                    if(dress_src_time < timeout*60) {act_dress.src = github_path + act_dress_id + `.png?raw=true`};
            };
            // PATH TO EMOTE
            act_emote_id = all_char[active_sp].emotes[active_em].id;
            if(emote_src_time < timeout*60) {act_emote.src =  github_path + act_emote_id + `.png?raw=true`};
            // PATH TO ACCESORIES
            if(all_char[active_sp].accs != false && active_ac != 0) {
                    act_acc_id = all_char[active_sp].accs[active_ac].id;
                    if(acc_src_time < timeout*60) {act_acc.src = github_path + act_acc_id + `.png?raw=true`};
            }
            //
            // PATH TO OFFLINE FILES
    } else {
            // PATH TO BODY
            if(body_src_time < timeout*60) {act_body.src = image_path + `body.png`};
            // PATH TO DRESS
            if(all_char[active_sp].dresses[active_dr].id != `body`) {
                    act_dress_id = all_char[active_sp].dresses[active_dr].id;
            if(dress_src_time < timeout*60) {act_dress.src = image_path + act_dress_id + `.png`};
            };
            // PATH TO EMOTE
            act_emote_id = all_char[active_sp].emotes[active_em].id;
            if(emote_src_time < timeout*60) {act_emote.src =  image_path + act_emote_id + `.png`}
            // PATH TO ACCESORIES
            if(all_char[active_sp].accs != false && active_ac != 0) {
                    act_acc_id = all_char[active_sp].accs[active_ac].id;
                    if(acc_src_time < timeout*60) {act_acc.src = image_path + act_acc_id + `.png`};
            }
    };
    //
    //          DRAWING SPRITES****
    //
    //          DRAWING BACKGROUND
    if(sp_bgcolor == `Светлая`) {ctx.fillStyle = "#ffffff"} else {ctx.fillStyle = "#000000"};
    ctx.fillRect(0, 0, 1440, 1080); // white background
    ctx.fillStyle=int_grad; ctx.fillRect(0, 0, 740, 1080); // blue gradient
    //          GET SELF DIST OFFSET
    if(all_char[active_sp].width !== undefined) {
        if(all_char[active_sp].width > 0) {
            red_dist_offset = dist_offset + all_char[active_sp].width/2; 
            red_sp_width = 900 + all_char[active_sp].width}
        else {
            red_dist_offset = dist_offset + (all_char[active_sp].width/2 * (-1));
            red_sp_width = 900 + all_char[active_sp].width} 
    } else {red_dist_offset = dist_offset; red_sp_width = 900};
    //          DRAWING BODY
    if(!all_char[active_sp].dresses[active_dr].self) {
        if(act_body.height != 0) {
            if(censored == 'Включена') {
                // censoring w/o drawed dress
                if (act_dress.complete && act_dress.height != 0) {ctx.drawImage(act_body, red_dist_offset+sp_anch_x, 0, red_sp_width, 1080); body_status=false}
                else {
                    if(act_body.complete) {body_status = {str:`Тело не отображается без одежды т.к. включена цензура.`, clr:"#cc5500"}}};
                if(!act_body.complete) {body_status = {str:`Изображение тела скачивается${download_ani}`, clr:"#000099"}}}
            else {ctx.drawImage(act_body, red_dist_offset+sp_anch_x, 0, red_sp_width, 1080); body_status=false}}
        else {if(body_src_time < timeout*60) {
                body_status = {str:`Поиск изображения тела... (${Math.floor((timeout*60 - body_src_time)/6)/10} сек.)`, clr:"#009900"}; 
                body_src_time++}
            else {body_status = {str:`Поиск изображения тела прекращен! (timeout)`, clr:"#990000"}}}}
    else {body_status = {str:`Тело нарисовано вместе с одеждой.`, clr:"#000099"}};
    //ctx.drawImage(act_body, dist_offset+sp_anch_x, 0);
    //          DRAWING DRESS
    if(all_char[active_sp].dresses[active_dr].id != `body`) {
        if(act_dress.height != 0) {
            ctx.drawImage(act_dress, red_dist_offset+sp_anch_x, 0, red_sp_width, 1080); dress_status=false;
            if(!act_dress.complete) {dress_status = {str:`Изображение одежды скачивается${download_ani}`, clr:"#000099"}}}
        else {if(dress_src_time < timeout*60) {
                dress_status = {str:`Поиск изображения одежды... (${Math.floor((timeout*60 - dress_src_time)/6)/10} сек.)`, clr:"#009900"};
                dress_src_time++}
            else {dress_status = {str:`Поиск изображения одежды прекращен! (timeout)`, clr:"#990000"}}}};
    //ctx.drawImage(act_dress, dist_offset+sp_anch_x, 0);
    //          DRAWING ACCS
    if(all_char[active_sp].accs != false && active_ac != 0) {
            if(act_acc.height != 0) {ctx.drawImage(act_acc, red_dist_offset+sp_anch_x, 0, red_sp_width, 1080); acc_status=false;
                if(!act_acc.complete) {acc_status = {str:`Изображение аксессуара скачивается${download_ani}`, clr:"#000099"}}}
            else {if (acc_src_time < timeout*60) {
                    acc_status = {str:`Поиск изображения аксессуара... (${Math.floor((timeout*60 - acc_src_time)/6)/10} сек.)`, clr:"#009900"};
                    acc_src_time++}
                else {acc_status = {str:`Поиск изображения аксессуара прекращен! (timeout)`, clr:"#990000"}}}};
    //ctx.drawImage(act_acc, dist_offset+sp_anch_x, 0);
    //          DRAWING EMOTE
    if(act_emote.height != 0) {ctx.drawImage(act_emote, red_dist_offset+sp_anch_x, 0, red_sp_width, 1080); emote_status=false;
        if(!act_emote.complete) {emote_status = {str:`Изображение эмоции скачивается${download_ani}`, clr:"#000099"}}}
    else {if (emote_src_time < timeout*60) {
        emote_status = {str:`Поиск изображения эмоции... (${Math.floor((timeout*60 - emote_src_time)/6)/10} сек.)`, clr:"#009900"};
            emote_src_time++}
        else {emote_status = {str:`Поиск изображения эмоции прекращен! (timeout)`, clr:"#990000"}}};
    //ctx.drawImage(act_emote, dist_offset+sp_anch_x, 0);
    //
    // DRAWING INFO ABOUT SPRITE
    ctx.fillStyle = "#000000"; ctx.font = "italic 40px Helvetica";
    ctx.fillText(`Персонаж: ${all_char[active_sp].name}`, 20, 120, [550]);
    ctx.fillText(`Поза: ${act_pose}`, 20, 160, [550]);
    ctx.fillText(`Одежда: ${all_char[active_sp].dresses[active_dr].name}`, 20, 200, [550]);
    ctx.fillText(`Эмоция: ${all_char[active_sp].emotes[active_em].id}`, 20, 240, [550]);
    if(all_char[active_sp].accs != false) {
            if(active_ac != 0) {acc_name=all_char[active_sp].accs[active_ac].name} else {acc_name=`Не выбран`}} 
            else {acc_name = `Не имеются`};
    ctx.fillText(`Аксессуар: ${acc_name}`, 20, 280, [550]);
    ctx.fillText(`RenPy-код спрайта:`, 20, 360); 
    ctx.fillStyle = "#003399"; ctx.font = "bold 28px Courier";
    if(active_ac == 0) {
        ctx.fillText(`show ${all_char[active_sp].id} ${
            all_char[active_sp].emotes[active_em].id} ${
            all_char[active_sp].dresses[active_dr].id} ${
            active_ds.id}`, 20, 400, [550]);
    } else {
        ctx.fillText(`show ${all_char[active_sp].id} ${
            all_char[active_sp].emotes[active_em].id} ${
            all_char[active_sp].accs[active_ac].id} ${
            all_char[active_sp].dresses[active_dr].id} ${
            active_ds.id}`, 20, 400, [550]);
    };
    //
    // DRAWING DEBUG INFO
    // SEARCH & DRAW STATUS
    ctx.font = "bold 22px Helvetica";
    if(body_status != false)    {ctx.fillStyle = body_status.clr; ctx.fillText(body_status.str, 20, 520, [550])};
    if(dress_status != false)   {ctx.fillStyle = dress_status.clr; ctx.fillText(dress_status.str, 20, 540, [550])};
    if(emote_status != false)   {ctx.fillStyle = emote_status.clr; ctx.fillText(emote_status.str, 20, 560, [550])};
    if(acc_status != false)     {ctx.fillStyle = acc_status.clr; ctx.fillText(acc_status.str, 20, 580, [550])};
    // MODDED CONTENT STATUS
    ctx.fillStyle = "#fc7a00";
    if(char_mode != false)      {ctx.fillText(`Персонаж "${all_char[active_sp].name}" взят из мода "${char_mode}"!`, 20, 620, [550])}
    if(dress_mode != false)     {ctx.fillText(`Одежда "${all_char[active_sp].dresses[active_dr].name}" взята из мода "${dress_mode}"!`, 20, 640, [550])};
    if(emote_mode != false)     {ctx.fillText(`Эмоция "${all_char[active_sp].emotes[active_em].id}" взята из мода "${emote_mode}"!`, 20, 660, [550])};
    if(acc_mode != false)       {ctx.fillText(`Аксессуар "${all_char[active_sp].accs[active_ac].name}" взят из мода "${acc_mode}"!`, 20, 680, [550])};
    if(acc_mode || char_mode || dress_mode || emote_mode) {
        ctx.fillStyle = "#fc5a00";
        ctx.fillText(`Спрайта в данном виде нет в ванильной игре!`, 20, 710, [550])
    } else {
        ctx.fillStyle = "#009900";
        ctx.fillText(`Спрайт в данном виде есть в ванильной игре.`, 20, 710, [550])
    };
    //
    // AUTHOR & OTHER INFO
    ctx.fillStyle = "#000099"; ctx.font = "bold 40px Helvetica";
    ctx.fillText(`Sprite Preview - by potapello`, 20, 930);
    ctx.fillStyle = "#000055";
    ctx.fillText(`ver. ${sp_version}`, 20, 970);
    ctx.fillStyle = "#000033"; ctx.font = "22px Helvetica";
    ctx.fillText(`Наводите на слова над кнопками для доп. информации.`, 20, 1015, [550]);
    ctx.fillText(`Иногда ресурс может загрузиться, даже если поиск прекращен.`, 20, 1040, [550]);
    ctx.fillText(`Scale = ${Math.floor(document.body.style.zoom*100)}%, ~FPS = ${Math.floor(100000/freq_frames)/10}`, 20, 1065);
    // REQUEST
    requestAnimationFrame(sam);
};
//
// SWITCH FUNCTIONS
//
function next_dr() {
        if(active_dr+1 < all_char[active_sp].dresses.length) {active_dr++} else {active_dr=0};
        res_timers(); if(active_dr == 0 && censored == 'Включена') {active_dr = 1}
     
};
function prev_dr() {
        if(active_dr > 0) {active_dr--} else {active_dr=all_char[active_sp].dresses.length-1};
        res_timers(); if(active_dr == 0 && censored == 'Включена') {active_dr=all_char[active_sp].dresses.length-1};
     
};
//
function next_em() {
        if(active_em+1 < all_char[active_sp].emotes.length) {active_em++} else {active_em=0};
        res_timers()
        
};
function prev_em() {
        if(active_em > 0) {active_em--} else {active_em=all_char[active_sp].emotes.length-1};
        res_timers()
    
};
//
function updat_sp() {active_dr = 1; active_ac = 0; res_timers()};
function todef_em() {active_em = all_char[active_sp].def_em};
//
function next_sp() {
        updat_sp(); if(active_sp+1 < all_char.length) {active_sp++} else {active_sp=0;}; todef_em();
};
function prev_sp() {
        updat_sp(); if(active_sp > 0) {active_sp--} else {active_sp=all_char.length-1;}; todef_em();
};
//
function next_ac() {
        if(all_char[active_sp].accs != false) {
            res_timers();
            if(active_ac+1 < all_char[active_sp].accs.length) {active_ac++} else {active_ac=0}}}
function prev_ac() {
        if(all_char[active_sp].accs != false) {
            res_timers();
            if(active_ac > 0) {active_ac--} else {active_ac=all_char[active_sp].accs.length-1}}};
//
function switch_scale() {
    switch(sp_scale) {
        case `normal`: sp_scale = `comp2x`; break;
        case `comp2x`: sp_scale = `comp4x`; break;
        case `comp4x`: sp_scale = `normal`; break;
    };
    updat_sp_scale(); res_timers();
};
//
function res_timers() {
    body_src_time = 0; dress_src_time = 0; emote_src_time = 0; acc_src_time = 0;
};
//
function switch_cens() {
    if(censored == 'Включена') {censored = 'Выключена'}
    else {censored = 'Включена'; if(active_dr==0) {active_dr=1}};
    updat_cens()
};
//
function switch_tscale() {
    if(to_scale == `Включен`) {to_scale = `Выключен`}
    else {to_scale = `Включен`};
    updat_tscale()
};
/*  смена тем между светлой и белой, нет фикса шрифта
function switch_bgcolor() {
    if(sp_bgcolor == `Светлая`) {sp_bgcolor = `Тёмная`} else {sp_bgcolor = `Светлая`}
    updat_bgcolor();
};
*/