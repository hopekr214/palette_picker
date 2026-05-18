import { useState } from "react";

const Q1 = [
  { id: "anger",      label: "I'm angry",                   sub: "Frustrated, furious, done" },
  { id: "vibrancy",   label: "Everything is clicking",      sub: "Energized, firing on all cylinders" },
  { id: "wound",      label: "My mind won't slow down",     sub: "Restless, anxious, overstimulated" },
  { id: "pensive",    label: "I'm deep in thought",         sub: "Reflective, processing, wondering" },
  { id: "ruminating", label: "I keep going over something", sub: "A thought that won't leave" },
  { id: "heavy",      label: "I feel heavy and depleted",   sub: "Tired, low, in need of comfort" },
  { id: "hands",      label: "Just need something to do",   sub: "Neutral, looking for quiet focus" },
];

// Each mood gets its own Q2 headline, sub, and option labels
const Q2_BY_MOOD = {
  anger: {
    head: ["How do you want", "to work with it?"],
    sub:  "the colors will meet you where you are",
    opts: [
      { id: "cool", label: "Cool it down"   },
      { id: "warm", label: "Lean into it"   },
      { id: "deep", label: "Let it go dark" },
    ],
  },
  vibrancy: {
    head: ["What kind of palette", "feels like today?"],
    sub:  "choose the one that matches your energy",
    opts: [
      { id: "cool", label: "Crisp and alive"  },
      { id: "warm", label: "Warm and golden"  },
      { id: "deep", label: "Deep and rooted"  },
    ],
  },
  wound: {
    head: ["What draws you", "right now?"],
    sub:  "choose by feeling, not by thinking",
    opts: [
      { id: "cool", label: "Quiet and still"  },
      { id: "warm", label: "Soft and gentle"  },
      { id: "deep", label: "Deeply calm"      },
    ],
  },
  pensive: {
    head: ["What's the tone", "of your thinking?"],
    sub:  "let the colors match the mood",
    opts: [
      { id: "cool", label: "Cool and clear"   },
      { id: "warm", label: "Warm and amber"   },
      { id: "deep", label: "Dark and still"   },
    ],
  },
  ruminating: {
    head: ["What do you want", "to do with it?"],
    sub:  "there's no wrong answer",
    opts: [
      { id: "cool", label: "Step back a little"  },
      { id: "warm", label: "Sit with it"         },
      { id: "deep", label: "Go quiet with it"    },
    ],
  },
  heavy: {
    head: ["What do you", "need right now?"],
    sub:  "choose what calls to you",
    opts: [
      { id: "cool", label: "Something light"     },
      { id: "warm", label: "Something cozy"      },
      { id: "deep", label: "Something grounding" },
    ],
  },
  hands: {
    head: ["What draws you", "right now?"],
    sub:  "choose by feeling, not by thinking",
    opts: [
      { id: "cool", label: "Cool and clear"  },
      { id: "warm", label: "Warm and easy"   },
      { id: "deep", label: "Dark and slow"   },
    ],
  },
};

function makeKey(a, b) { return a + "|" + b; }

// ─── 21 palettes ─────────────────────────────────────────────
const P = {};

P[makeKey("anger","cool")] = {
  name: "Iron Shore", tagline: "Channel it through something cold and solid",
  colors: [
    { hex: "#3A4A58", dmc: "3750", name: "Very Dark Antique Blue"     },
    { hex: "#446068", dmc: "924",  name: "Very Dark Gray Green"       },
    { hex: "#587080", dmc: "3768", name: "Dark Slate Gray"            },
    { hex: "#28606A", dmc: "3808", name: "Ultra Very Dark Turquoise"  },
    { hex: "#8AACA8", dmc: "927",  name: "Light Gray Green"           },
  ],
};
P[makeKey("anger","warm")] = {
  name: "Ember", tagline: "Honor the heat — let it burn slowly",
  colors: [
    { hex: "#B52828", dmc: "321",  name: "Red"                   },
    { hex: "#C83028", dmc: "349",  name: "Dark Coral"            },
    { hex: "#C24A0A", dmc: "900",  name: "Dark Burnt Orange"     },
    { hex: "#A06228", dmc: "3826", name: "Golden Brown"          },
    { hex: "#5A4435", dmc: "3031", name: "Very Dark Mocha Brown" },
  ],
};
P[makeKey("anger","deep")] = {
  name: "Obsidian", tagline: "Let the darkness absorb it",
  colors: [
    { hex: "#3A3A3C", dmc: "3799", name: "Very Dark Pewter Gray"   },
    { hex: "#3A4A58", dmc: "3750", name: "Very Dark Antique Blue"  },
    { hex: "#504540", dmc: "3021", name: "Very Dark Brown Gray"    },
    { hex: "#606062", dmc: "317",  name: "Pewter Gray"             },
    { hex: "#547070", dmc: "3768", name: "Dark Slate Gray"         },
  ],
};

P[makeKey("vibrancy","cool")] = {
  name: "First Wind", tagline: "Crisp, clear, and fully alive",
  colors: [
    { hex: "#70B0CC", dmc: "519",  name: "Sky Blue"                  },
    { hex: "#98CCD8", dmc: "3761", name: "Light Sky Blue"            },
    { hex: "#D4EEF4", dmc: "747",  name: "Very Light Sky Blue"       },
    { hex: "#C4D2E0", dmc: "3752", name: "Very Light Antique Blue"   },
    { hex: "#688E8E", dmc: "926",  name: "Medium Gray Green"         },
  ],
};
P[makeKey("vibrancy","warm")] = {
  name: "Golden Light", tagline: "Stitch something worthy of today",
  colors: [
    { hex: "#F5CA80", dmc: "3821", name: "Straw"                       },
    { hex: "#F6D8A4", dmc: "3822", name: "Light Straw"                 },
    { hex: "#EDA444", dmc: "3854", name: "Medium Autumn Gold"          },
    { hex: "#9EB578", dmc: "471",  name: "Very Light Avocado Green"    },
    { hex: "#BA9264", dmc: "422",  name: "Light Hazelnut Brown"        },
  ],
};
P[makeKey("vibrancy","deep")] = {
  name: "Living Wood", tagline: "Rooted and fully energized",
  colors: [
    { hex: "#285040", dmc: "500",  name: "Very Dark Blue Green"   },
    { hex: "#386858", dmc: "501",  name: "Dark Blue Green"        },
    { hex: "#467050", dmc: "3346", name: "Hunter Green"           },
    { hex: "#6E9A5E", dmc: "3347", name: "Medium Yellow Green"    },
    { hex: "#C6D698", dmc: "3348", name: "Light Yellow Green"     },
  ],
};

P[makeKey("wound","cool")] = {
  name: "Still Waters", tagline: "Quiet the noise",
  colors: [
    { hex: "#8EAAA6", dmc: "927",  name: "Light Gray Green"          },
    { hex: "#B8CAC4", dmc: "928",  name: "Very Light Gray Green"     },
    { hex: "#C4D2DE", dmc: "3752", name: "Very Light Antique Blue"   },
    { hex: "#84AEA0", dmc: "503",  name: "Medium Blue Green"         },
    { hex: "#D6C4AC", dmc: "3033", name: "Very Light Mocha Brown"    },
  ],
};
P[makeKey("wound","warm")] = {
  name: "First Light", tagline: "Soften, not silence",
  colors: [
    { hex: "#CCC2D2", dmc: "3743", name: "Very Light Antique Violet" },
    { hex: "#D4B0B8", dmc: "778",  name: "Very Light Antique Mauve"  },
    { hex: "#CACCE6", dmc: "3747", name: "Very Light Blue Violet"    },
    { hex: "#F2F0EC", dmc: "3865", name: "Winter White"              },
    { hex: "#B2A2BC", dmc: "3042", name: "Light Antique Violet"      },
  ],
};
P[makeKey("wound","deep")] = {
  name: "Deep Rest", tagline: "Let the dark hold you",
  colors: [
    { hex: "#3A4A58", dmc: "3750", name: "Very Dark Antique Blue" },
    { hex: "#4A5C6C", dmc: "930",  name: "Dark Antique Blue"      },
    { hex: "#687A8A", dmc: "931",  name: "Medium Antique Blue"    },
    { hex: "#587070", dmc: "3768", name: "Dark Slate Gray"        },
    { hex: "#98A8B6", dmc: "932",  name: "Light Antique Blue"     },
  ],
};

P[makeKey("pensive","cool")] = {
  name: "Scholar's Hour", tagline: "The quiet of a good, long thought",
  colors: [
    { hex: "#3A4A58", dmc: "3750", name: "Very Dark Antique Blue" },
    { hex: "#4A5C6C", dmc: "930",  name: "Dark Antique Blue"      },
    { hex: "#3A7A82", dmc: "3809", name: "Very Dark Turquoise"    },
    { hex: "#687A8A", dmc: "931",  name: "Medium Antique Blue"    },
    { hex: "#98A8B6", dmc: "932",  name: "Light Antique Blue"     },
  ],
};
P[makeKey("pensive","warm")] = {
  name: "Amber Study", tagline: "Warm light and open questions",
  colors: [
    { hex: "#9C7420", dmc: "3829", name: "Very Dark Old Gold"      },
    { hex: "#E6A636", dmc: "3820", name: "Dark Straw"              },
    { hex: "#BC9264", dmc: "422",  name: "Light Hazelnut Brown"    },
    { hex: "#D6C4AC", dmc: "3033", name: "Very Light Mocha Brown"  },
    { hex: "#584232", dmc: "3031", name: "Very Dark Mocha Brown"   },
  ],
};
P[makeKey("pensive","deep")] = {
  name: "Deep Thought", tagline: "Still surface, moving underneath",
  colors: [
    { hex: "#446460", dmc: "924",  name: "Very Dark Gray Green"   },
    { hex: "#50624E", dmc: "3051", name: "Dark Green Gray"        },
    { hex: "#3A3A3C", dmc: "3799", name: "Very Dark Pewter Gray"  },
    { hex: "#3A4A58", dmc: "3750", name: "Very Dark Antique Blue" },
    { hex: "#869A80", dmc: "3053", name: "Green Gray"             },
  ],
};

P[makeKey("ruminating","cool")] = {
  name: "Worn Path", tagline: "A little distance between you and the thought",
  colors: [
    { hex: "#948A7A", dmc: "642",  name: "Dark Beige Gray"           },
    { hex: "#B2AC9C", dmc: "644",  name: "Medium Beige Gray"         },
    { hex: "#B2A2BC", dmc: "3042", name: "Light Antique Violet"      },
    { hex: "#C4D2DE", dmc: "3752", name: "Very Light Antique Blue"   },
    { hex: "#D6C4AC", dmc: "3033", name: "Very Light Mocha Brown"    },
  ],
};
P[makeKey("ruminating","warm")] = {
  name: "Old Amber", tagline: "Something you keep turning over",
  colors: [
    { hex: "#C6A486", dmc: "3782", name: "Light Mocha Brown"       },
    { hex: "#A68A6E", dmc: "3032", name: "Medium Mocha Brown"      },
    { hex: "#766E62", dmc: "640",  name: "Very Dark Beige Gray"    },
    { hex: "#D6C4AC", dmc: "3033", name: "Very Light Mocha Brown"  },
    { hex: "#BC9264", dmc: "422",  name: "Light Hazelnut Brown"    },
  ],
};
P[makeKey("ruminating","deep")] = {
  name: "Night Loop", tagline: "Sit with it in the dark for a while",
  colors: [
    { hex: "#584A40", dmc: "3021", name: "Very Dark Brown Gray"   },
    { hex: "#766E62", dmc: "640",  name: "Very Dark Beige Gray"   },
    { hex: "#3A4A58", dmc: "3750", name: "Very Dark Antique Blue" },
    { hex: "#3A3A3C", dmc: "3799", name: "Very Dark Pewter Gray"  },
    { hex: "#584232", dmc: "3031", name: "Very Dark Mocha Brown"  },
  ],
};

P[makeKey("heavy","cool")] = {
  name: "Open Shore", tagline: "A breath of open air",
  colors: [
    { hex: "#B8CAC4", dmc: "928",  name: "Very Light Gray Green"        },
    { hex: "#C4D2DE", dmc: "3752", name: "Very Light Antique Blue"      },
    { hex: "#E8EEF6", dmc: "3756", name: "Ultra Very Light Baby Blue"   },
    { hex: "#C0D6CE", dmc: "504",  name: "Very Light Blue Green"        },
    { hex: "#E2E4E2", dmc: "762",  name: "Very Light Pearl Gray"        },
  ],
};
P[makeKey("heavy","warm")] = {
  name: "Hearthside", tagline: "Warm and fully held",
  colors: [
    { hex: "#ECC29C", dmc: "951",  name: "Light Tawny"              },
    { hex: "#D6C4AC", dmc: "3033", name: "Very Light Mocha Brown"   },
    { hex: "#E6C696", dmc: "738",  name: "Very Light Tan"           },
    { hex: "#F2F0EC", dmc: "3865", name: "Winter White"             },
    { hex: "#BC9264", dmc: "422",  name: "Light Hazelnut Brown"     },
  ],
};
P[makeKey("heavy","deep")] = {
  name: "Forest Floor", tagline: "Rooted, grounded, held",
  colors: [
    { hex: "#849878", dmc: "523",  name: "Light Fern Green"                  },
    { hex: "#987654", dmc: "840",  name: "Medium Beige Brown"                },
    { hex: "#C6B096", dmc: "842",  name: "Very Light Beige Brown"            },
    { hex: "#50624E", dmc: "3051", name: "Dark Green Gray"                   },
    { hex: "#EEE8DE", dmc: "3866", name: "Ultra Very Light Mocha Brown"      },
  ],
};

P[makeKey("hands","cool")] = {
  name: "Sea Glass", tagline: "Clear and unhurried",
  colors: [
    { hex: "#84AEA0", dmc: "503",  name: "Medium Blue Green"   },
    { hex: "#669690", dmc: "502",  name: "Blue Green"          },
    { hex: "#C0D6CE", dmc: "504",  name: "Very Light Blue Green" },
    { hex: "#587070", dmc: "3768", name: "Dark Slate Gray"     },
    { hex: "#8EAAA6", dmc: "927",  name: "Light Gray Green"    },
  ],
};
P[makeKey("hands","warm")] = {
  name: "Golden Hour", tagline: "Warm light on your hands",
  colors: [
    { hex: "#C88C78", dmc: "3778", name: "Light Terra Cotta"      },
    { hex: "#ECC29C", dmc: "951",  name: "Light Tawny"            },
    { hex: "#BA7060", dmc: "356",  name: "Medium Terra Cotta"     },
    { hex: "#D6C4AC", dmc: "3033", name: "Very Light Mocha Brown" },
    { hex: "#9C6854", dmc: "407",  name: "Dark Desert Sand"       },
  ],
};
P[makeKey("hands","deep")] = {
  name: "Quiet Dusk", tagline: "Evening hours, slow work",
  colors: [
    { hex: "#3A3A3C", dmc: "3799", name: "Very Dark Pewter Gray"  },
    { hex: "#3A4A58", dmc: "3750", name: "Very Dark Antique Blue" },
    { hex: "#446460", dmc: "924",  name: "Very Dark Gray Green"   },
    { hex: "#869A80", dmc: "3053", name: "Green Gray"             },
    { hex: "#50624E", dmc: "3051", name: "Dark Green Gray"        },
  ],
};

// CSS
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@300;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .app { min-height: 100vh; background: #FAF8F5; font-family: 'Jost', sans-serif; font-weight: 300; color: #2D2A26; padding: 2rem 1.25rem 4rem; }
  .wordmark { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 12px; letter-spacing: .12em; color: #9A9490; text-align: center; margin-bottom: 2.5rem; }
  .dots { display: flex; gap: 6px; justify-content: center; margin-bottom: 2rem; }
  .dot { width: 5px; height: 5px; border-radius: 50%; background: #E0DDD9; transition: background .2s; }
  .dot.on { background: #2D2A26; }
  .head { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(1.7rem, 4.5vw, 2.4rem); line-height: 1.2; text-align: center; color: #2D2A26; margin-bottom: .5rem; }
  .sub { font-size: 12px; color: #9A9490; text-align: center; letter-spacing: .06em; margin-bottom: 2rem; }
  .wrap { max-width: 480px; margin: 0 auto; }
  .q1-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; max-width: 480px; margin: 0 auto 2rem; }
  .q1-grid > .card:last-child:nth-child(odd) { grid-column: span 2; }
  .card { border: 1px solid #E8E4E0; border-radius: 11px; padding: .9rem 1rem; cursor: pointer; background: #fff; transition: all .18s; text-align: left; }
  .card:hover { border-color: #C4BFBA; transform: translateY(-1px); }
  .card.sel { border-color: #2D2A26; background: #2D2A26; color: #FAF8F5; }
  .card-main { font-family: 'Cormorant Garamond', serif; font-size: 1rem; display: block; margin-bottom: 3px; line-height: 1.3; }
  .card-sub { font-size: 10px; color: #9A9490; letter-spacing: .03em; line-height: 1.4; }
  .card.sel .card-sub { color: #9A8E85; }
  .strip-opts { display: grid; gap: 9px; max-width: 480px; margin: 0 auto 2rem; }
  .strip-card { border: 1px solid #E8E4E0; border-radius: 11px; overflow: hidden; cursor: pointer; transition: all .18s; background: #fff; }
  .strip-card:hover { border-color: #C4BFBA; transform: translateY(-1px); }
  .strip-card.sel { border: 2px solid #2D2A26; }
  .strip-row { display: flex; height: 52px; }
  .strip-seg { flex: 1; }
  .strip-lbl { padding: .7rem 1rem; font-size: 12px; color: #6B6560; letter-spacing: .05em; }
  .strip-card.sel .strip-lbl { color: #2D2A26; font-weight: 400; }
  .btn { display: block; width: 100%; padding: .85rem; background: #2D2A26; color: #FAF8F5; border: none; border-radius: 8px; font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 300; letter-spacing: .1em; cursor: pointer; transition: opacity .15s; margin-bottom: .65rem; }
  .btn:hover { opacity: .85; }
  .btn:disabled { opacity: .32; cursor: default; }
  .btn-g { display: block; width: 100%; padding: .85rem; background: transparent; color: #9A9490; border: 1px solid #E8E4E0; border-radius: 8px; font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 300; letter-spacing: .08em; cursor: pointer; transition: all .15s; }
  .btn-g:hover { border-color: #C4BFBA; color: #6B6560; }
  .back { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #9A9490; cursor: pointer; border: none; background: none; padding: 0; margin: 0 auto 1.5rem; max-width: 480px; letter-spacing: .05em; font-family: 'Jost', sans-serif; }
  .back:hover { color: #6B6560; }
  .palette-bar { display: flex; height: 52px; border-radius: 9px; overflow: hidden; margin-bottom: 1.5rem; }
  .palette-seg { flex: 1; }
  .dmc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(86px, 1fr)); gap: 9px; margin-bottom: 1rem; }
  .dmc-card { border: 1px solid #E8E4E0; border-radius: 10px; overflow: hidden; background: #fff; }
  .dmc-swatch { height: 66px; width: 100%; }
  .dmc-info { padding: .55rem .65rem; }
  .dmc-num { font-size: 13px; font-weight: 400; color: #2D2A26; display: block; margin-bottom: 1px; }
  .dmc-name { font-size: 10px; color: #9A9490; letter-spacing: .02em; display: block; margin-bottom: .4rem; line-height: 1.35; overflow-wrap: break-word; }
  .copy-btn { font-size: 10px; letter-spacing: .04em; border: none; background: none; padding: 0; cursor: pointer; font-family: 'Jost', sans-serif; transition: color .15s; color: #C8C4C0; }
  .copy-btn:hover { color: #9A9490; }
  .copy-btn.done { color: #6A9E7A; }
  .copy-all-btn { display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 11px; letter-spacing: .07em; border: 1px solid #E8E4E0; border-radius: 7px; padding: .55rem 1rem; cursor: pointer; background: transparent; font-family: 'Jost', sans-serif; margin-bottom: 1.1rem; transition: all .15s; width: 100%; color: #6B6560; }
  .copy-all-btn:hover { border-color: #C4BFBA; color: #2D2A26; }
  .copy-all-btn.done { color: #6A9E7A; border-color: #6A9E7A; }
  .shop-note { font-size: 11px; color: #C0BCBA; text-align: center; margin-bottom: 1.5rem; letter-spacing: .03em; }
  .email-box { background: #fff; border: 1px solid #E8E4E0; border-radius: 13px; padding: 1.85rem 1.35rem; max-width: 400px; margin: 0 auto; text-align: center; }
  .mini-dots { display: flex; gap: 6px; justify-content: center; margin-bottom: 1.1rem; }
  .mini-dot { width: 22px; height: 22px; border-radius: 50%; }
  .email-in { width: 100%; padding: .72rem .95rem; border: 1px solid #E8E4E0; border-radius: 7px; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 300; color: #2D2A26; background: #FAF8F5; outline: none; transition: border .15s; margin-bottom: .65rem; }
  .email-in:focus { border-color: #9A9490; }
  .priv { font-size: 10px; color: #C4BFBA; margin-top: .6rem; letter-spacing: .02em; }
  .done-box { background: #fff; border: 1px solid #E8E4E0; border-radius: 13px; padding: 2.25rem 1.35rem; max-width: 400px; margin: 0 auto; text-align: center; }
  .hr { border: none; border-top: 1px solid #E8E4E0; margin: 1.25rem 0; }
  .tag-pills { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-top: .85rem; }
  .tag-pill { font-size: 10px; letter-spacing: .05em; color: #9A9490; border: 1px solid #E8E4E0; border-radius: 20px; padding: 3px 10px; }
`;

export default function PalettePicker() {
  const [step,   setStep]   = useState("q1");
  const [q1,     setQ1]     = useState(null);
  const [q2,     setQ2]     = useState(null);
  const [email,  setEmail]  = useState("");
  const [saved,  setSaved]  = useState(false);
  const [copied, setCopied] = useState(null);

  const palette = (q1 && q2) ? P[makeKey(q1, q2)] : null;
  const q2Def   = q1 ? Q2_BY_MOOD[q1] : null;
  const stepNum = { q1:1, q2:2, result:3, email:4 }[step] ?? 1;
  const q1Label = Q1.find(o => o.id === q1)?.sub ?? "";
  const q2Label = q2Def?.opts.find(o => o.id === q2)?.label ?? "";

  // Strips show actual palette colors for this mood
  const q2Opts = q2Def
    ? q2Def.opts.map(o => ({
        ...o,
        strip: (P[makeKey(q1, o.id)]?.colors || []).map(c => c.hex),
      }))
    : [];

  function copy(text, id) {
    try { navigator.clipboard?.writeText(text); } catch (_) {}
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  }

  function copyAll() {
    if (!palette) return;
    copy(palette.colors.map(c => `DMC ${c.dmc}  ${c.name}`).join("\n"), "__all__");
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <p className="wordmark">stitch & still — palette finder</p>

        <div className="dots">
          {[1,2,3,4].map(n => (
            <div key={n} className={`dot${stepNum >= n ? " on" : ""}`} />
          ))}
        </div>

        {/* ── Q1 ── */}
        {step === "q1" && (
          <>
            <h1 className="head">Where are you<br /><em>right now?</em></h1>
            <p className="sub">be honest — this shapes your palette</p>
            <div className="q1-grid">
              {Q1.map(o => (
                <div key={o.id}
                  className={`card${q1 === o.id ? " sel" : ""}`}
                  onClick={() => setQ1(o.id)}
                >
                  <span className="card-main">{o.label}</span>
                  <span className="card-sub">{o.sub}</span>
                </div>
              ))}
            </div>
            <div className="wrap">
              <button className="btn" disabled={!q1} onClick={() => setStep("q2")}>
                continue →
              </button>
            </div>
          </>
        )}

        {/* ── Q2: headline, sub, and options all specific to selected mood ── */}
        {step === "q2" && q2Def && (
          <>
            <button className="back" onClick={() => setStep("q1")}>← back</button>
            <h1 className="head">
              {q2Def.head[0]}<br /><em>{q2Def.head[1]}</em>
            </h1>
            <p className="sub">{q2Def.sub}</p>
            <div className="strip-opts">
              {q2Opts.map(o => (
                <div key={o.id}
                  className={`strip-card${q2 === o.id ? " sel" : ""}`}
                  onClick={() => setQ2(o.id)}
                >
                  <div className="strip-row">
                    {o.strip.map((c, i) => (
                      <div key={i} className="strip-seg" style={{ background: c }} />
                    ))}
                  </div>
                  <p className="strip-lbl">{o.label}</p>
                </div>
              ))}
            </div>
            <div className="wrap">
              <button className="btn" disabled={!q2} onClick={() => setStep("result")}>
                see my palette →
              </button>
            </div>
          </>
        )}

        {/* ── Result ── */}
        {step === "result" && palette && (
          <>
            <button className="back" onClick={() => setStep("q2")}>← back</button>
            <h1 className="head">{palette.name}</h1>
            <p className="sub">{palette.tagline}</p>
            <div className="wrap">
              <div className="palette-bar">
                {palette.colors.map((c, i) => (
                  <div key={i} className="palette-seg" style={{ background: c.hex }} />
                ))}
              </div>
              <div className="dmc-grid">
                {palette.colors.map(c => (
                  <div key={c.dmc} className="dmc-card">
                    <div className="dmc-swatch" style={{ background: c.hex }} />
                    <div className="dmc-info">
                      <span className="dmc-num">DMC {c.dmc}</span>
                      <span className="dmc-name">{c.name}</span>
                      <button
                        className={`copy-btn${copied === c.dmc ? " done" : ""}`}
                        onClick={() => copy(c.dmc, c.dmc)}
                      >
                        {copied === c.dmc ? "✓ copied" : "copy #"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={`copy-all-btn${copied === "__all__" ? " done" : ""}`}
                onClick={copyAll}
              >
                {copied === "__all__" ? "✓ all numbers copied" : "copy all 5 DMC numbers"}
              </button>
              <p className="shop-note">find these at your craft store of choice — search by number</p>
              <button className="btn" onClick={() => setStep("email")}>save my palette</button>
              <button className="btn-g" onClick={() => setStep("email")}>just browsing</button>
            </div>
          </>
        )}

        {/* ── Email ── */}
        {step === "email" && !saved && palette && (
          <>
            <button className="back" onClick={() => setStep("result")}>← back</button>
            <div className="email-box">
              <div className="mini-dots">
                {palette.colors.map((c, i) => (
                  <div key={i} className="mini-dot" style={{ background: c.hex }} />
                ))}
              </div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.45rem", marginBottom:".45rem", lineHeight:1.3 }}>
                Your <em>{palette.name}</em> palette
              </h2>
              <p style={{ fontSize:"11px", color:"#9A9490", marginBottom:"1.35rem", lineHeight:1.7, letterSpacing:".02em" }}>
                We'll send your DMC thread list, where to shop, and patterns that use this palette.
              </p>
              <input type="email" className="email-in" placeholder="your@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && email && setSaved(true)}
              />
              <button className="btn" disabled={!email} onClick={() => setSaved(true)}>
                send my palette
              </button>
              <p className="priv">no spam · unsubscribe anytime</p>
            </div>
          </>
        )}

        {/* ── Done ── */}
        {step === "email" && saved && palette && (
          <div className="done-box">
            <div className="mini-dots">
              {palette.colors.map((c, i) => (
                <div key={i} className="mini-dot" style={{ background: c.hex }} />
              ))}
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.45rem", marginBottom:".45rem" }}>
              On its way ✦
            </h2>
            <p style={{ fontSize:"11px", color:"#9A9490", lineHeight:1.7, marginBottom:".75rem", letterSpacing:".02em" }}>
              Your <strong style={{ color:"#6B6560", fontWeight:400 }}>{palette.name}</strong> palette and DMC thread list are heading to your inbox.
            </p>
            <div className="tag-pills">
              <span className="tag-pill">{q1Label.toLowerCase()}</span>
              <span className="tag-pill">{q2Label.toLowerCase()}</span>
            </div>
            <div className="hr" />
            <button className="btn" onClick={() => {
              setStep("q1"); setQ1(null); setQ2(null); setSaved(false); setEmail("");
            }}>
              try another palette
            </button>
          </div>
        )}
      </div>
    </>
  );
}
