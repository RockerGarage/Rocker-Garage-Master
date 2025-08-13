# Rocker Garage — Ops Cheats (2025-08-10)

Owners: **Greg’s** (you) • **RG-GPT** (assistant)  
Source of truth: **S3** `s3://rocker-garage-assets/rg/` (region **us-east-1**)

---

## TL;DR — Do we still need “Total Recall”?
**Yes.** It’s our daily, timestamped heartbeat + a stable LATEST URL so we never lose the thread during chat/sandbox resets.  
If you want less noise, we can change the cadence to weekly in one command (see **Scheduler Cheats**).

---

## Permanent URLs
- Latest Total Recall:  
  `https://rocker-garage-assets.s3.amazonaws.com/rg/meta/total-recall/Total_Recall_LATEST.txt`
- Dated pattern:  
  `https://rocker-garage-assets.s3.amazonaws.com/rg/meta/total-recall/RG_Total_Recall_YYYY-MM-DD.txt`

---

## S3 Layout (canonical)
```text
s3://rocker-garage-assets/
└── rg/
    ├── prod/      (live site assets)
    │   ├── img/   (final images)
    │   ├── audio/ (final MP3/OGG)
    │   ├── video/ (final MP4/WebM)
    │   ├── fonts/ (web fonts)
    │   └── build/ (HTML/CSS/JS bundles)
    ├── upload/    (staging you push to)
    ├── staging/   (work-in-progress)
    ├── archive/   (retired/old)
    └── meta/
        ├── total-recall/
        └── playbooks/  (this cheats doc lives here)
```
**Public read** is allowed under `rg/*`. **Versioning** is enabled.

---

## One-Time CloudShell Setup (Region)
```bash
aws configure set default.region us-east-1
export REGION=us-east-1 BUCKET=rocker-garage-assets PREFIX=rg
```

---

## Total Recall Cheats

### Force a refresh now
```bash
aws lambda invoke --function-name rg-total-recall --payload '{}' out.json --region us-east-1 && cat out.json
```

### Self-test (invoke + verify + URLs + logs)
```bash
./rg_total_recall_self_test.sh
```

### Scheduler Cheats (EventBridge)
```bash
# Show schedule state + next run
aws scheduler get-schedule --name rg-total-recall-nightly --region us-east-1   --query '{State:State,Next:NextInvocationTime,TZ:ScheduleExpressionTimezone}'

# Disable / Enable
aws scheduler update-schedule --name rg-total-recall-nightly --state DISABLED --region us-east-1
aws scheduler update-schedule --name rg-total-recall-nightly --state ENABLED  --region us-east-1

# Change cadence to weekly Sunday 10pm local (America/Indiana/Indianapolis)
aws scheduler update-schedule --name rg-total-recall-nightly   --schedule-expression "cron(0 22 ? * SUN *)"   --schedule-expression-timezone "America/Indiana/Indianapolis"   --region us-east-1
```

### Logs (last 15 minutes)
```bash
aws logs tail /aws/lambda/rg-total-recall --since 15m --region us-east-1
```

---

## Deploy Cheats (static assets)

### Stage to /upload then promote to /prod
```bash
# Stage (example: team module build)
aws s3 cp ./local/build/team/ s3://$BUCKET/$PREFIX/upload/build/team/ --recursive --region $REGION

# Review staged listing
aws s3 ls s3://$BUCKET/$PREFIX/upload/build/team/ --region $REGION

# Promote to prod (copy with same paths)
aws s3 cp s3://$BUCKET/$PREFIX/upload/build/team/ s3://$BUCKET/$PREFIX/prod/build/team/ --recursive --region $REGION
```

### Public URL pattern for prod build files
```text
https://rocker-garage-assets.s3.amazonaws.com/rg/prod/build/<subpath>/<file>
```

---

## Audio (MP3 → OGG)

You can convert locally (recommended) and upload:
```bash
# Local machine (with ffmpeg installed)
ffmpeg -i rg_audio_v8_rev_v1.mp3 -c:a libvorbis -qscale:a 5 rg_audio_v8_rev_v1.ogg
ffmpeg -i rg_audio_amp_hum_v2.mp3 -c:a libvorbis -qscale:a 5 rg_audio_amp_hum_v2.ogg

# Upload both formats to prod/audio
aws s3 cp rg_audio_v8_rev_v1.mp3 s3://$BUCKET/$PREFIX/prod/audio/ --region $REGION
aws s3 cp rg_audio_v8_rev_v1.ogg s3://$BUCKET/$PREFIX/prod/audio/ --region $REGION
aws s3 cp rg_audio_amp_hum_v2.mp3 s3://$BUCKET/$PREFIX/prod/audio/ --region $REGION
aws s3 cp rg_audio_amp_hum_v2.ogg s3://$BUCKET/$PREFIX/prod/audio/ --region $REGION
```

---

## Naming Rule (critical files)
Always include the date: `<slug>_YYYY-MM-DD.<ext>`

Examples:
```text
Team_Page_Module_2025-08-10.zip
RG_Ops_Cheats_{today}.md
```

---

## Quick Recovery (if Lambda ever needs a kick)
```bash
# Increase timeout (if you see 3s timeouts)
aws lambda update-function-configuration   --function-name rg-total-recall --timeout 15 --memory-size 256 --region us-east-1

# Re-run now
aws lambda invoke --function-name rg-total-recall --payload '{}' out.json --region us-east-1 && cat out.json
```

---

## CloudShell “Stuck at >” (heredoc) Fix
If you see only `>`, the shell is waiting for your terminator.  
You started with `<<'PY'` → end with a line that is exactly `PY`.  
Can’t recover? Press **Ctrl+C** once.

---

## Upload this Cheats Doc to S3
```bash
# Put dated + latest copies in meta/playbooks/
aws s3 cp RG_Ops_Cheats_2025-08-10.md s3://rocker-garage-assets/rg/meta/playbooks/RG_Ops_Cheats_2025-08-10.md --region us-east-1
aws s3 cp RG_Ops_Cheats_2025-08-10.md s3://rocker-garage-assets/rg/meta/playbooks/RG_Ops_Cheats_LATEST.md   --content-type text/markdown --cache-control no-store --region us-east-1
```