-- Society Wives — Five Veils of Desire
-- Episode 03 / Ankita / Scene 01 — Rajeev's Parcel Call & Private Afterbeat
-- 1 January 2026 | 13:05–13:15 (planning clock)
-- Status: USER-SUPPLIED GRAPHICAL/FANTASY/ACTION SOURCE PRESERVED, COMPOSITE PROSE DRAFT, NOT WEB-PUBLISHED
-- The original user text is stored unchanged in story_scene_source_versions and a companion Markdown source file.
-- The opening conversation and scene transitions use assistant-authored detail, with the author's exact revised phone dialogue.
-- Corrected backstory: Ankita and Kabir brought Rajeev from the roadside and invited him to live with them after marriage.
-- A04's interrupted remark refers to THAT history and must not be interpreted as a sexual rejection or invitation.
-- Rajeev is NOT an actual father-in-law. He is socially addressed as Uncle.
-- No later Jan 1 parcel handover or discovery; parcel remains in Rajeev's custody.
-- This is a SQLite-compatible file in GitHub; not executed against a live database.

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

CREATE TABLE IF NOT EXISTS story_scene_source_versions (
 scene_key TEXT NOT NULL,
 source_key TEXT NOT NULL,
 source_kind TEXT NOT NULL,
 source_path TEXT NOT NULL,
 verbatim_content TEXT NOT NULL,
 PRIMARY KEY(scene_key, source_key)
);

BEGIN TRANSACTION;
DELETE FROM story_scene_blocks WHERE scene_key = 'SW-ANKITA-EP03-S01';

INSERT OR REPLACE INTO story_scene_source_versions
 (scene_key,source_key,source_kind,source_path,verbatim_content)
VALUES ('SW-ANKITA-EP03-S01','USER_EP03_S01_2026-11-15','USER_AUTHORED_VERBATIM','Society-Wives/episode-03-ankita-scene-01-user-verbatim.md','**ANKITA · EPISODE 03 · SCENE 01**  
**Rajeev’s Parcel Call & Private Afterbeat**  
**1 January 2026 · Approximately 13:05–13:15**

Ankita Cyber City office mein thi. Phone pe parcel notification aaya. Usne turant call kiya.

**Ankita:** “Rajeev Uncle, courier ka notification aaya. Gopal ne kisko de diya?”

**Rajeev:** “Mere paas aa gaya hai. Main ghar pe rakh deta hoon.”

Call khatam. Ankita wapas kaam mein lag gayi. Usse kuch pata nahi tha.

---

Ghar pe Rajeev akela tha. Usne parcel table pe rakha. Loose edge se pink lace dikh raha tha. Usne box carefully khola. Andar ek complete set bacha hua tha — soft pink lace bra aur matching panty. Saath mein dildo ka box bhi.

Usne bathroom ka darwaza band kiya. Parcel saamne rakha. Lace panty haath mein li. Kapda halka tha, almost transparent. Usne use apni nose ke paas le gaya. Koi used smell nahi thi, lekin uske dimaag mein Ankita ka subah wala fitted tee yaad aa gaya — waist, shoulders, woh confident walk.

Rajeev ne aankhein band ki. Imagination mein Ankita bathroom mein thi, yahi panty pehne hue. Woh uske saamne khadi thi, lace uski pussy pe chipka hua. Usne socha kaise woh uske peeche aata, haath uski kamar pe rakhta, panty side se hataata. Ankita ki saans tez hoti, lekin woh rukti nahi.

Uska lund tight ho gaya. Usne panty apne lund pe ragdi, dheere. Fabric soft tha. Usne imagine kiya Ankita uske saamne jhukti hai, uski aankhon mein dekhti hai, aur dheere se kehti hai “Uncle…” 

Rajeev ki saans bhari ho gayi. Usne aur pressure badhaya. Fantasy mein Ankita ki pussy lace ke through geeli thi. Woh usse dheere se chodta, Ankita ka naam leta, aur woh uska lund andar leti.

Woh almost aa gaya. Usne panty wapas box mein rakhi, dildo side mein. Saans control ki. Mirror mein apna chehra dekha. Koi guilt nahi tha abhi. Sirf heat thi.

Usne box band kiya aur bedroom ke cupboard mein rakh diya. Ankita ko kuch pata nahi chalega.

Bahar living room mein wapas aaya. Phone silent tha. Rajeev sofa pe baith gaya, lekin uske haath abhi bhi us lace ka texture yaad kar rahe the.');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',1,'01:05','narration','Cyber City office mein release-monitoring dashboard abhi bhi open tha. Ankita apni desk par baithi logs check kar rahi thi. Cream embroidered kurti, beige blazer aur fitted trousers mein woh subah se kaam kar rahi thi.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',2,'01:05','narration','Phone vibrate hua. Courier notification screen par chamka: *Delivered.*','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',3,'01:05','narration','Ankita ne notification khola. Confirmation expected time se late update hui thi. Subah gate par Gopal ko di hui instruction usse turant yaad aayi—parcel receive karke record karna, message karna, aur bina uski approval kisi ko handover nahi karna.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',4,'01:05','thought','*Maine clearly kaha tha kisi aur ko handover mat karna. Phir yeh late confirmation?*','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',5,'01:06','narration','Usne contact list mein Rajeev ka number select kiya. Gulmohar Heights mein Rajeev committee meeting ke baad ghar aa chuka tha. Damaged carton uske table par rakha tha. Screen par Ankita ka naam dekhte hi usne box ki taraf nazar uthayi, phir call receive ki.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',6,'01:06','dialogue','**Ankita:** “Rajeev Uncle, courier ka notification aaya. Gopal ne kisko de diya?”','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',7,'01:06','dialogue','**Rajeev:** “Mere paas aa gaya hai. Main ghar pe rakh deta hoon.”','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',8,'01:07','narration','Call khatam. Ankita ne phone rakhkar monitoring dashboard ki taraf dhyaan lautaya. Uske liye sawal abhi sirf delivery ka tha. Usse seal, opened carton ya missing sets ke baare mein kuch pata nahi tha.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',9,'01:07','narration','Rajeev ne phone neeche rakha. Gopal ka naam sunte hi uske dimaag mein subah ki handover chain ghoom gayi: gate, committee office, Mahendra ka explanation, aur meeting mein logon ki ajeeb baatein. Woh khud bhi sab sach nahi jaanta tha.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',10,'01:08','thought','*Usne seedha Gopal ko kyun poochha? Haan, delivery toh usi ke hawale ki thi. Lekin agar woh register maangegi toh?*','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',11,'01:08','narration','Rajeev ne parcel ki taraf dekha. Subah Gopal ko di gayi responsibility, committee office mein damaged seal ka explanation aur un logon ki meeting ab uske dimaag mein ek chain ki tarah ghoom rahe the. Woh original items ka total nahi jaanta tha. Uski private curiosity aur usse mili family ki jagah do alag baatein thi.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',12,'01:09','user_authored_parcel','Ghar pe Rajeev akela tha. Usne parcel table pe rakha. Loose edge se pink lace dikh raha tha. Usne box carefully khola. Andar ek complete set bacha hua tha — soft pink lace bra aur matching panty. Saath mein dildo ka box bhi.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',13,'01:10','user_authored_action','Usne bathroom ka darwaza band kiya. Parcel saamne rakha. Lace panty haath mein li. Kapda halka tha, almost transparent. Usne use apni nose ke paas le gaya. Koi used smell nahi thi, lekin uske dimaag mein Ankita ka subah wala fitted tee yaad aa gaya — waist, shoulders, woh confident walk.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',14,'01:11','user_authored_fantasy','Rajeev ne aankhein band ki. Imagination mein Ankita bathroom mein thi, yahi panty pehne hue. Woh uske saamne khadi thi, lace uski pussy pe chipka hua. Usne socha kaise woh uske peeche aata, haath uski kamar pe rakhta, panty side se hataata. Ankita ki saans tez hoti, lekin woh rukti nahi.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',15,'01:12','user_authored_fantasy','Uska lund tight ho gaya. Usne panty apne lund pe ragdi, dheere. Fabric soft tha. Usne imagine kiya Ankita uske saamne jhukti hai, uski aankhon mein dekhti hai, aur dheere se kehti hai “Uncle…” ','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',16,'01:13','user_authored_fantasy','Rajeev ki saans bhari ho gayi. Usne aur pressure badhaya. Fantasy mein Ankita ki pussy lace ke through geeli thi. Woh usse dheere se chodta, Ankita ka naam leta, aur woh uska lund andar leti.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',17,'01:14','user_authored_action','Woh almost aa gaya. Usne panty wapas box mein rakhi, dildo side mein. Saans control ki. Mirror mein apna chehra dekha. Koi guilt nahi tha abhi. Sirf heat thi.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',18,'01:14','user_authored_closing','Usne box band kiya aur bedroom ke cupboard mein rakh diya. Ankita ko kuch pata nahi chalega.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',19,'01:14','user_authored_closing','Bahar living room mein wapas aaya. Phone silent tha. Rajeev sofa pe baith gaya, lekin uske haath abhi bhi us lace ka texture yaad kar rahe the.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',20,'01:15','narration','Cyber City office mein Ankita ne monitoring dashboard refresh kiya. Usse parcel ki asal handling ka koi pata nahi tha. Door ki taraf se Sana aur Aishwarya ki hansi sunayi di. Ankita ne laptop se nazar uthayi. Agla scene wahi se shuru hota hai.','DRAFT_FOR_USER_REVIEW');

INSERT OR REPLACE INTO story_scene_blocks
 (scene_key,episode,lead,scene_number,scene_title,story_date,scene_start,scene_end,block_order,block_time,block_type,body_text,review_status)
VALUES ('SW-ANKITA-EP03-S01','03','ankita','01','Rajeev''s Parcel Call & Private Afterbeat','2026-01-01','13:05','13:15',21,'01:15','scene_end','Scene 01 ends. Scene 02 — The Five-Person Stamina Challenge begins.','DRAFT_FOR_USER_REVIEW');

COMMIT;

-- SELECT block_order, block_time, block_type, body_text FROM story_scene_blocks
-- WHERE scene_key='SW-ANKITA-EP03-S01' ORDER BY block_order;
-- SELECT verbatim_content FROM story_scene_source_versions
-- WHERE scene_key='SW-ANKITA-EP03-S01' AND source_key='USER_EP03_S01_2026-11-15';
