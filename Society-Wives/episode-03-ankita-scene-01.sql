-- Society Wives — Five Veils of Desire
-- Episode 03 / Ankita / Scene 01 — The Call and Rajeev's Private Secret
-- Source status: DRAFT_FOR_USER_REVIEW, not published to site
-- SQLite-compatible story storage. SQL script saved in GitHub, not executed against a live DB.
-- Canon: 2026-01-01; 13:05–13:15; Rajeev socially addressed as Papa/Uncle, NOT actual FIL.
-- Rule: leave every graphical passage as exactly [GRAPHICAL DESCRIPTION REQUIRED]; never automatically fill, tone down or summarize a placeholder.
-- 2 graphical passage slots in this version, other scene counts may differ as needed.

CREATE TABLE IF NOT EXISTS story_scene_blocks (
 scene_key TEXT NOT NULL,
 episode TEXT NOT NULL,
 lead TEXT NOT NULL,
 scene_number TEXT NOT NULL,
 scene_title TEXT NOT NULL,
 story_date TEXT NOT NULL,
 scene_start TEXT NOT NULL,
 scene_end TEXT NOT NULL,
 block_order INTEGER NOT NULL,
 block_time TEXT,
 block_type TEXT NOT NULL,
 body_text TEXT NOT NULL,
 review_status TEXT NOT NULL DEFAULT 'DRAFT_FOR_USER_REVIEW',
 PRIMARY KEY(scene_key, block_order)
);

BEGIN TRANSACTION;
INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',1,'01:05','narration','Cyber City office mein release-monitoring dashboard abhi bhi open tha. Ankita apni desk par baithi logs check kar rahi thi. Cream embroidered kurti, beige blazer aur fitted trousers mein woh subah se kaam kar rahi thi.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',2,'01:05','narration','Phone vibrate hua. Courier notification screen par chamka: *Delivered.*','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',3,'01:05','narration','Ankita ne notification khola. Confirmation expected time se late update hui thi. Subah gate par Gopal ko di hui instruction usse turant yaad aayi—parcel receive karke record karna, message karna, aur bina uski approval kisi ko handover nahi karna.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',4,'01:05','thought','*Maine clearly kaha tha kisi aur ko handover mat karna. Phir yeh late confirmation?*','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',5,'01:06','narration','Usne contact list mein Rajeev ka number select kiya. Gulmohar Heights mein Rajeev committee meeting ke baad parcel lekar apne private room tak aa chuka tha. Damaged carton uske saamne rakha tha. Screen par Ankita ka naam dekhte hi usne box ki taraf nazar uthayi, phir call receive ki.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',6,'01:06','dialogue','**Ankita:** “Papa, courier ka notification aaya. Gopal ne kisko de diya?”','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',7,'01:06','dialogue','**Rajeev:** “Mere paas aa gaya hai beta. Main ghar par rakh deta hoon.”','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',8,'01:07','narration','Call khatam. Ankita ne phone rakhkar monitoring dashboard ki taraf dhyaan lautaya. Uske liye sawal abhi sirf delivery ka tha. Usse seal, opened carton ya missing sets ke baare mein kuch pata nahi tha.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',9,'01:07','narration','Rajeev ne phone neeche rakha. Gopal ka naam sunte hi uske dimaag mein subah ki handover chain ghoom gayi: gate, committee office, Mahendra ka explanation, aur meeting mein logon ki ajeeb baatein. Woh khud bhi sab sach nahi jaanta tha.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',10,'01:08','thought','*Usne seedha Gopal ko kyun poochha? Haan, delivery toh usi ke hawale ki thi. Lekin agar woh register maangegi toh?*','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',11,'01:08','narration','Uski nazar wapas carton par gayi. Breakfast table ka ek adhoora moment uske zehen mein aa gaya. Ankita black fitted athletic tee aur running tights mein thi; Karan aur Aman ki masti se dining area bhara hua tha. Usne newspaper neeche kiya tha aur bina soche apni baat kuch zyada personal bana di thi.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',12,'01:09','memory','**Rajeev (morning memory):** “Waise… woh log galat bhi nahi keh rahe the. Bina jacket ke tum achhi lagti ho, Ankita.”','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',13,'01:09','memory','**Rajeev (morning memory):** “Aur sirf kapdon ki baat nahi. Tum dil se bhi bahut khoobsurat ho… aur apni fitness ka bhi achha khayal rakhti ho. Tabhi toh…”','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',14,'01:09','memory','**Ankita (morning memory):** “Please stop, Uncle. We won''t discuss it. Bas.”','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',15,'01:10','narration','Woh jumla wahin ruk gaya tha. Ankita ne uske baad jacket pehen li thi aur baat ko aage nahi badhne diya tha. Rajeev ko uski awaaz ka firmness yaad tha. Uska kuch bhi na kehna, Ankita ki taraf se koi chhupi hui haan nahi tha.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',16,'01:10','narration','Phir bhi, parcel ko dekhte hue Rajeev ke mann mein apne hi banaaye sawaal badh rahe the. Committee mein usne doosron se kaha tha ki Kabir aur Ankita ke ghar ki baaton par bina jaane assumptions mat banaiye. Ab woh khud un assumptions se bach nahi paa raha tha.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',17,'01:10','narration','Usne damaged carton ko table par seedha kiya. Loose flap ke neeche ek pink lace set, ek sealed personal adult item aur instruction manual abhi bhi the. Use nahi pata tha ki original parcel mein saat clothing sets the aur chhe alag log ek-ek set le chuke hain.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',18,'01:11','graphic_placeholder','[GRAPHICAL DESCRIPTION REQUIRED]','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',19,'01:11','narration','Rajeev ne ek pal darwaaze ki taraf dekha. Phir personal item apne saath lekar private bathroom mein gaya. Usne door band kiya. Is dauraan Ankita Cyber City office mein thi, aur is sab se bilkul anjaan.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',20,'01:12','graphic_placeholder','[GRAPHICAL DESCRIPTION REQUIRED]','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',21,'01:14','narration','Kuch der baad bathroom ka darwaaza khula. Rajeev room mein wapas aaya. Table par rakhe parcel ko dekhkar usne saans sambhali. Subah ki Ankita ki boundary, dopahar ki seedhi delivery inquiry, aur apni chhupayi hui curiosity—teeno uske dimaag mein ek saath aa gaye.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',22,'01:14','thought','*Jab woh parcel maangegi, tab main kya kahunga?*','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',23,'01:14','narration','Usne koi jawab decide nahi kiya. Parcel usi ki custody mein raha. Is waqt Ankita ko koi handover nahi hua, aur contents ki koi additional removal ya damage confirmed nahi hua.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',24,'01:15','narration','Cyber City office mein Ankita ne monitoring dashboard refresh kiya. Uske liye sabse zaroori kaam abhi release sign-off tha. Door ke paas se hansi ki awaaz aayi. Sana aur Aishwarya aa chuki thi. Ankita ne laptop se nazar uthayi.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','The Call and Rajeev''s Private Secret','2026-01-01','13:05','13:15',25,'01:15','end','**Scene 01 ends. Scene 02 — The Five-Person Stamina Challenge begins.**','DRAFT_FOR_USER_REVIEW');
COMMIT;

-- View prose in order:
-- SELECT block_order, block_time, block_type, body_text FROM story_scene_blocks WHERE scene_key = 'SW-ANKITA-EP03-S01' ORDER BY block_order;
