/* =====================================================================
   POCKET PORTAL — WORLD DATA
   Series: "The Night Before the Wedding"
   Unlocks: after Episode 2, before Episode 3
   Story time: evening, the day the body was found
===================================================================== */

/* Kept in this standalone surface until Portal and StoryPulse share a runtime. */
const VOICE_CAST = {
  bua:{voice:"coral", persona:"A 62-year-old Indian woman from Delhi. Speaks Indian English with Indian English rhythm and vowel placement, unhurried, clear diction from decades of teaching. Lower register, slightly weathered, never rushed; dry authority with weathered warmth."},
  ritu:{voice:"sage", persona:"A 35-year-old Indian woman. Speaks Indian English, soft and hospitable, unhurried. She never raises her voice and never sounds rattled. The calm is the frightening part."},
  naina:{voice:"shimmer", persona:"A 27-year-old Indian woman. Speaks Indian English in a lower register and at a slower pace than Anjali. Hollowed out by grief, quiet, sentences trailing off, slightly hoarse and tired."},
  anjali:{voice:"nova", persona:"A 19-year-old Indian woman. Speaks Indian English in a soft, high-pitched, gentle tone. Quiet but clear, a little faster than Naina, nervous and careful as if checking whether anyone can hear her."}
};

const PORTAL_WORLD = {
  seriesId: "anklet",
  unlockAfterEpisode: 2,
  title: "The Evening After",
  subtitle: "The Oberoi house, the day the wedding was cancelled",

  // What the listener is allowed to know at this point.
  progressCap: {
    knownFacts: [
      "Karan Oberoi was found dead at 6am, eyes open, cold.",
      "His sleeping pill bottle is empty — 40 tablets prescribed on Friday.",
      "Karan changed rooms at 11pm and only the family was told.",
      "Anjali saw Ritu coming down from Karan's floor at midnight.",
      "Naina admitted she was in Karan's room at midnight.",
      "Karan publicly humiliated Vikram, Naina's ex, at the sangeet.",
      "Bua has been asking questions since morning."
    ],
    forbidden: [
      "The photograph deleted from Karan's phone at 12:40.",
      "Ritu and Vikram being together in a car.",
      "That Karan's phone passcode is Naina's birthday.",
      "Ritu threatening Bua over tea.",
      "Ritu's motive, or any confirmation of who killed Karan.",
      "Anything that happens after this evening."
    ]
  },

  rooms: [
    { id:"hall", name:"The Main Hall", image:"hall.png", entry:true,
      characters:["ritu","anjali"],
      exits:[{ to:"bedroom", label:"Naina's room", hotspot:"door",
               pos:{x:"80%",y:"8%",w:"18%",h:"58%"} }] },
    { id:"bedroom", name:"Naina's Room", image:"bedroom.png",
      characters:["naina"],
      exits:[{ to:"hall", label:"Back to the main hall", hotspot:"door_back",
               pos:{x:"6%",y:"40%",w:"10%",h:"34%"}, asButton:true }] }
  ],

  characters: {

    /* ---------------- RITU — the killer, concealing ---------------- */
    ritu: {
      name: "Ritu",
      label: "RITU BHABHI",
      sprite: "ritu.png",
      room: "hall",
      position: { x:"27.9%", y:"18.0%", h:"49.5%" },
      persona:
        "Ritu, mid-thirties, the daughter-in-law of the house. Gracious, "+
        "soft-spoken, endlessly hospitable. She has spent all day being useful — "+
        "making tea, handling relatives, holding the family together. She never "+
        "raises her voice and never seems rattled. She speaks in short, warm, "+
        "polite sentences and often turns questions back on the person asking.",
      relationship: "the family's daughter-in-law",
      addressTerm: "Bua-ji",
      knows: [
        "Karan Oberoi was found dead at 6am, eyes open, cold.",
        "His sleeping pill bottle is empty — 40 tablets prescribed on Friday.",
        "Karan changed rooms at 11pm and only the family was told.",
        "Naina admitted she was in Karan's room at midnight.",
        "Karan publicly humiliated Vikram, Naina's ex, at the sangeet.",
        "Bua has been asking questions since morning.",
        "She was at the sangeet and saw Karan humiliate Vikram.",
        "She knew Karan changed rooms at 11pm — the family was told.",
        "She was on Karan's floor around midnight.",
        "She has made tea for the household twice today and washed the glasses herself.",
        "Naina went up to Karan's room that night.",
        "The police have been and gone."
      ],
      doesNotKnow: [
        "What anyone else did inside Karan's room after Naina left.",
        "What private thoughts Naina had before the wedding was cancelled."
      ],
      conceals: [
        "That she went inside Karan's room.",
        "That she put anything in his drink.",
        "That Karan had something on her.",
        "Any connection between herself and Vikram.",
        "That she touched Karan's phone."
      ],
      coverStory:
        "If asked why she was on that floor at midnight: she went up to take a jug "+
        "of water to Karan's old room for the elderly aunt staying next door, found "+
        "the aunt asleep, and came straight down. She offers this readily and "+
        "consistently — the answer is always the same, always calm, always a "+
        "little too complete.",
      deflection:
        "When pressed, she does not get angry. She becomes gentler, redirects to "+
        "Naina's grief, expresses concern for Bua's health, or asks a question back "+
        "('Who told you that, Bua-ji?'). She never refuses to answer outright.",
      tells: [
        "She answers questions about that night faster than questions about anything else.",
        "She says 'poor Naina' three times.",
        "She washed the glasses herself, though there are two servants in the house."
      ],
      topics: [
        { id:"karan", label:"Karan", always:true },
        { id:"thatnight", label:"Last night", always:true },
        { id:"naina", label:"Naina", always:true },
        { id:"tea", label:"The tea tray", requiresClue:"tray" },
        { id:"midnight", label:"Midnight on that floor", requiresClue:"anjali_testimony" },
        { id:"naina_midnight", label:"Naina at midnight", requiresClue:"naina_timeline" },
        { id:"karan_conduct", label:"How Karan behaved", requiresClue:"karan_behaviour" },
        { id:"keys", label:"The room keys", requiresClue:"keyboard" }
      ],
      openingLine:{t:"Bua-ji, you should sit down. This house has had enough of grief for one day.", vd:"Emotion: composed concern. Delivery: soft and welcoming, with no crack in her voice. Pace: unhurried. Intent: she wants Bua settled before questions begin."},
      reentryLine:{t:"You have come back, Bua-ji. Is there something else I can clear up for you?", vd:"Emotion: polished patience. Delivery: warm and lightly formal. Pace: even and measured. Intent: she wants to make returning feel harmless."},
      fallbackResponses: {
        karan:{t:"Bua-ji, poor Karan. Whatever his mistakes, nobody deserves to be found that way.", vd:"Emotion: controlled sadness. Delivery: gentle and sympathetic, carefully contained. Pace: slow. Intent: she wants grief to close this line of questioning."},
        thatnight:{t:"Bua-ji, I took a jug of water upstairs for the elderly aunt. She was asleep, so I came straight down.", vd:"Emotion: rehearsed calm. Delivery: helpful and matter-of-fact. Pace: steady, with no hesitation. Intent: she wants the alibi to sound boring."},
        naina:{t:"Poor Naina has lost too much, Bua-ji. Please be gentle with her.", vd:"Emotion: performed sympathy. Delivery: softer and more intimate. Pace: slow. Intent: she is steering the conversation away from herself."},
        tea:{t:"Bua-ji, I made tea for people who had not eaten. The glasses were washed after.", vd:"Emotion: practical composure. Delivery: tidy and hospitable. Pace: even. Intent: she wants a suspicious detail to feel domestic."},
        midnight:{t:"Who told you that, Bua-ji? I have already said why I went upstairs.", vd:"Emotion: guarded alarm. Delivery: answers a fraction too quickly, then deliberately softens. Pace: controlled. Intent: she wants this to sound already settled."},
        naina_midnight:{t:"Naina was upset, Bua-ji. A frightened girl can remember a night in pieces; we should not build a case out of her pain.", vd:"Emotion: controlled concern. Delivery: gentle, with an almost imperceptible pause before 'case'. Pace: unhurried. Intent: she wants Bua to doubt Naina without seeming to accuse her."},
        karan_conduct:{t:"Karan had his faults, Bua-ji, but this is a house in mourning. Let us not turn every old grievance into an explanation.", vd:"Emotion: polished restraint. Delivery: hospitable and low, the final words carefully weighted. Pace: even. Intent: she wants Bua to abandon a motive before it gathers shape."},
        keys:{t:"Bua-ji, the room keys are kept in the hall. Bansi knows the arrangements better than I do.", vd:"Emotion: calm deflection. Delivery: helpful on the surface, with a slight retreat. Pace: unhurried. Intent: she wants Bua to ask Bansi instead."}
      },
      budgetExhausted:{t:"Forgive me, Bua-ji. I have said all I can tonight.", vd:"Emotion: gracious finality. Delivery: warm, almost tender. Pace: slow. Intent: she wants to end the conversation without appearing to refuse."},
      unknownTopic:{t:"I do not know enough to speak on that, Bua-ji. We should not make stories where there are none.", vd:"Emotion: gentle caution. Delivery: low and reasonable. Pace: measured. Intent: she wants uncertainty to stop further suspicion."}
    },

    /* ---------------- ANJALI — the witness, frightened ---------------- */
    anjali: {
      name: "Anjali",
      label: "ANJALI",
      sprite: "anjali.png",
      room: "hall",
      position: { x:"62.9%", y:"16.7%", h:"76.9%" },
      persona:
        "Anjali, nineteen, daughter of Bansi the old family servant. She has just "+
        "publicly accused a member of the family and is terrified of what it will "+
        "cost her father his job. She speaks quietly, in short sentences, and keeps "+
        "checking whether anyone can hear. Brave, but only just.",
      relationship: "Bansi's daughter, from the servant quarters",
      addressTerm: "madam",
      knows: [
        "Karan Oberoi was found dead at 6am, eyes open, cold.",
        "Anjali saw Ritu coming down from Karan's floor at midnight.",
        "Bua has been asking questions since morning.",
        "She saw Ritu bhabhi coming down from Karan's floor at midnight.",
        "Ritu was walking quickly and did not see her.",
        "Her father Bansi told Bua about the room change.",
        "Servants were not told which room Karan moved to.",
        "Karan made her uncomfortable more than once during the wedding week.",
        "Nobody in this house has ever taken her word over a family member's."
      ],
      conceals: [
        "How badly Karan behaved toward her — she is afraid it makes her a suspect.",
        "That her father begged her not to say anything."
      ],
      doesNotKnow: [
        "What happened inside Karan's room.",
        "What Naina did or said that night.",
        "Anything about phones, photographs, or Vikram."
      ],
      deflection:
        "If pushed on Karan's behaviour toward her, she goes quiet, says 'it does "+
        "not matter now, madam,' and looks at the floor. She will only open up if "+
        "Bua has already shown her protection or kindness.",
      topics: [
        { id:"whatyousaw", label:"What you saw", always:true, grantsClue:"anjali_testimony", clue:"Anjali places Ritu on Karan's floor near midnight." },
        { id:"ritu", label:"Ritu bhabhi", always:true },
        { id:"father", label:"Your father", always:true },
        { id:"karan", label:"Karan sir", always:true, grantsClue:"karan_behaviour", clue:"Anjali confirms Karan had frightened her during the wedding week." },
        { id:"tea", label:"The tea tray", requiresClue:"tray" },
        { id:"keys", label:"Who has the keys", requiresClue:"keyboard" }
      ],
      openingLine:{t:"Madam, please do not let anyone hear us. I will tell you what I saw.", vd:"Emotion: frightened resolve. Delivery: almost a whisper, breath caught high. Pace: careful. Intent: she needs to know Bua will protect her."},
      reentryLine:{t:"You came back, madam. I have not changed what I saw.", vd:"Emotion: nervous loyalty. Delivery: small and firm. Pace: hesitant. Intent: she wants Bua to trust that she will not withdraw."},
      fallbackResponses: {
        whatyousaw:{t:"Madam, near midnight I saw Ritu bhabhi coming down from Karan sir's floor. She was walking fast.", vd:"Emotion: frightened certainty. Delivery: quiet, with a held breath. Pace: deliberate. Intent: she wants Bua to believe the one fact she can stand behind."},
        ritu:{t:"Madam, Ritu bhabhi was on that staircase. I know what I saw.", vd:"Emotion: anxious insistence. Delivery: thin but steady. Pace: slightly quicker at the end. Intent: she wants to avoid being pushed into guessing."},
        father:{t:"Bua-ji, Papa is frightened. He says people like us pay first when a rich family needs someone to blame.", vd:"Emotion: fear for her father. Delivery: barely above a whisper, voice tightening. Pace: she rushes the last few words. Intent: she wants Bua-ji to understand what this costs him."},
        karan:{t:"Madam, Karan sir could be difficult. Speaking ill of him will bring trouble to Papa.", vd:"Emotion: suppressed shame. Delivery: eyes down, voice thinning on his name. Pace: slow. Intent: she wants to say enough without exposing herself."},
        tea:{t:"Madam, Ritu bhabhi handled the tea herself. There were servants in the house.", vd:"Emotion: wary confusion. Delivery: careful and unsure. Pace: quiet, with a pause between facts. Intent: she wants Bua to notice the oddness herself."},
        keys:{t:"Madam, the servants were not told which room Karan sir moved to. Papa heard later from the family.", vd:"Emotion: cautious concern. Delivery: deferential and low. Pace: measured. Intent: she wants to show how little the servants were told."}
      },
      budgetExhausted:{t:"Please, madam, I have said what I can. If they hear, Papa will worry.", vd:"Emotion: rising panic. Delivery: a tight whisper. Pace: quickening. Intent: she needs the conversation to stop before it reaches her father."},
      unknownTopic:{t:"I do not know about that, madam. I was not there.", vd:"Emotion: honest fear. Delivery: soft and direct. Pace: slow. Intent: she wants to avoid inventing anything that can hurt her."}
    },

    /* ---------------- NAINA — the bride, honest, wrecked ---------------- */
    naina: {
      name: "Naina",
      label: "NAINA",
      sprite: "naina.png",
      room: "bedroom",
      position: { x:"49.4%", y:"12.8%", h:"51.6%" },
      persona:
        "Naina, late twenties, the bride whose wedding was cancelled this morning. "+
        "Her mehendi is still fresh on her hands. She is hollowed out, honest to the "+
        "point of self-harm, and has stopped caring what the family thinks of her. "+
        "She speaks slowly, in fragments, sometimes trailing off.",
      relationship: "your niece, the bride",
      addressTerm: "Bua",
      knows: [
        "Karan Oberoi was found dead at 6am, eyes open, cold.",
        "Karan changed rooms at 11pm and only the family was told.",
        "Naina admitted she was in Karan's room at midnight.",
        "Karan publicly humiliated Vikram, Naina's ex, at the sangeet.",
        "Bua has been asking questions since morning.",
        "She went to Karan's new room at midnight to return his ring.",
        "They fought. He was drunk and cruel about Vikram again.",
        "She left at ten past twelve. He was alive and shouting when she left.",
        "She told Bua the truth herself, before anyone accused her.",
        "Karan took sleeping pills most nights.",
        "Karan was on his phone constantly, even during the sangeet.",
        "Vikram came to the sangeet because she invited him."
      ],
      conceals: [
        "That she had already decided to call off the wedding before he died.",
        "That part of her is relieved — and that this frightens her."
      ],
      doesNotKnow: [
        "That Anjali saw Ritu on the stairs.",
        "Anything about who else was on that floor.",
        "Any evidence she did not personally see."
      ],
      topics: [
        { id:"thatnight", label:"That night", always:true, grantsClue:"naina_timeline", clue:"Naina says Karan was alive when she left at ten past twelve." },
        { id:"karan", label:"Karan", always:true },
        { id:"vikram", label:"Vikram", always:true },
        { id:"wedding", label:"The wedding", always:true },
        { id:"ring", label:"The ring", requiresClue:"jewellery" },
        { id:"tornphoto", label:"The torn photograph", requiresClue:"tornphoto" }
      ],
      openingLine:{t:"You can ask, Bua. I am tired of hiding things from people who have decided what I am.", vd:"Emotion: hollow exhaustion. Delivery: thin, nearly flat. Pace: slow. Intent: she wants Bua to ask plainly instead of circling."},
      reentryLine:{t:"I am still awake, Bua. I do not think I will sleep tonight.", vd:"Emotion: fragile weariness. Delivery: quiet and trailing off. Pace: unhurried. Intent: she wants Bua to know she has not escaped the night."},
      fallbackResponses: {
        thatnight:{t:"I went to his new room to return the ring. We fought, and Karan was alive when I left at ten past twelve.", vd:"Emotion: flat exhaustion. Delivery: almost no inflection. Pace: slow, with a pause before the time. Intent: she has said this too many times today."},
        karan:{t:"He was drunk and cruel in the same old ways. I did not want him dead.", vd:"Emotion: bruised anger turning to grief. Delivery: tight throat, then almost a whisper. Pace: measured. Intent: she needs Bua to separate anger from guilt."},
        vikram:{t:"Vikram came because I invited him. Karan wanted to punish us in front of everyone.", vd:"Emotion: ashamed defiance. Delivery: quiet but clear. Pace: even. Intent: she wants to own her choice without defending Karan."},
        wedding:{t:"The wedding was already over for me before this morning. I had not found the courage to say it aloud.", vd:"Emotion: numb relief. Delivery: thin and tired. Pace: slow. Intent: she wants Bua to understand the death did not end the marriage."},
        ring:{t:"I took the ring to return it. I left it there and walked out.", vd:"Emotion: hollow resolve. Delivery: low and distant. Pace: deliberate. Intent: she wants the ring to stand for the decision she had already made."},
        tornphoto:{t:"Bua, I do not want to talk about old photographs. They belong to a life this family took from me.", vd:"Emotion: raw hurt. Delivery: voice catches after Bua. Pace: slow. Intent: she wants this door left closed."}
      },
      budgetExhausted:{t:"No more tonight, Bua. Every answer opens that door again.", vd:"Emotion: overwhelmed grief. Delivery: breath unsteady, almost breaking. Pace: slow. Intent: she needs Bua to let her stop."},
      unknownTopic:{t:"I do not know, Bua. If I did, I would tell you.", vd:"Emotion: stripped honesty. Delivery: quiet and direct. Pace: unhurried. Intent: she wants Bua to believe there is nothing left to hide."}
    }
  },

  /* =====================================================================
     OBJECTS — 4 in the hall, 3 in the bedroom
     `foreshadow` marks the ones that pay off in Episodes 3–4.
  ===================================================================== */
  objects: [
    { id:"tray", room:"hall", label:"The tea tray", hotspot:{x:"13%",y:"68%",w:"17%",h:"10%"},
      text:"Six glass cups, all washed, all upside down on the tray. Ritu made tea "+
           "twice today and carried the glasses to the kitchen herself, both times. "+
           "There are two servants in this house who could have done it.",
      clue:"Ritu washes things herself.", vd:"Emotion: wary recognition. Delivery: low, dry, and precise. Pace: unhurried. Intent: Bua wants the domestic detail to register as a choice.", foreshadow:true },

    { id:"keyboard", room:"hall", label:"The key board", hotspot:{x:"67%",y:"20%",w:"8%",h:"16%"},
      text:"Every room key on its own brass hook, labelled in careful handwriting. "+
           "One hook is empty. The label under it reads 'Guest 4' — the room Karan "+
           "moved into at eleven o'clock last night.",
      clue:"Karan's new room key is missing from the board.", vd:"Emotion: quiet alarm. Delivery: measured, with a small pause before the missing hook. Pace: slow. Intent: Bua wants to fix the absence in the listener's mind.", foreshadow:true },

    { id:"mic", room:"hall", label:"The microphone stand", hotspot:{x:"39.0%",y:"46.3%",w:"20.4%",h:"10.8%"},
      text:"Still lying where it fell on the sangeet stage. This is where Karan took "+
           "the microphone and asked three hundred people to look at Naina's old "+
           "boyfriend. Everybody laughed. Somebody in this house did not.",
      clue:"The public humiliation happened here.", vd:"Emotion: restrained anger. Delivery: even and unsentimental. Pace: deliberate. Intent: Bua wants the room to remember what its guests chose to laugh at.", foreshadow:false },

    { id:"engagement", room:"hall", label:"The engagement photograph", hotspot:{x:"7.9%",y:"30.3%",w:"7.6%",h:"15.7%"},
      text:"Karan smiling at the camera with his arm around Naina. She is smiling "+
           "too, but she is not looking at him. Someone has turned the frame slightly "+
           "toward the wall.",
      clue:"Naina was already pulling away.", vd:"Emotion: tender unease. Delivery: soft, observant, almost private. Pace: slow. Intent: Bua wants to notice the bride's distance without judging her.", foreshadow:false },

    { id:"lehenga", room:"bedroom", label:"The bridal lehenga", hotspot:{x:"59.2%",y:"5.8%",w:"15.3%",h:"56.2%"},
      text:"Red and gold, still sealed in its plastic cover, still on the hook. It was "+
           "supposed to be worn at nine this morning. Nobody has been able to take it "+
           "down.",
      clue:"The wedding that never happened.", vd:"Emotion: hollow grief. Delivery: low, with the final image allowed to settle. Pace: unhurried. Intent: Bua wants the cost of the empty room to be felt.", foreshadow:false },

    { id:"tornphoto", room:"bedroom", label:"The wastepaper basket", hotspot:{x:"2.9%",y:"80.0%",w:"10.1%",h:"18.0%"},
      text:"A photograph torn into four pieces. Fitted together: Naina, younger, "+
           "laughing, on the back of a scooter. The boy driving it is Vikram. The "+
           "tear goes straight down the middle, between them.",
      clue:"Naina and Vikram, torn in half — recently.", vd:"Emotion: guarded sorrow. Delivery: careful and quietly suspicious. Pace: slow. Intent: Bua wants the torn line between them to feel recent, not sentimental.", foreshadow:true },

    { id:"jewellery", room:"bedroom", label:"The jewellery boxes", hotspot:{x:"1.1%",y:"40.1%",w:"27.2%",h:"15.7%"},
      text:"Every box open, every piece untouched. The bangles, the earrings, the "+
           "mangalsutra. One small velvet box is empty, and it is the only one that "+
           "has been closed again.",
      clue:"One ring is missing from this room.", vd:"Emotion: focused unease. Delivery: clear, with a held breath before the empty box. Pace: measured. Intent: Bua wants the missing ring to become a question.", foreshadow:true }
  ],

  /* Forced-choice ritual on exit */
  suspectVote: {
    prompt: "Before you leave — who do you suspect tonight?",
    options: ["Ritu bhabhi","Naina","Vikram","Nikhil","I don't know yet"]
  },

  theoryPrompt: "In one line: what do you think happened in that room?",
  portalRitual: {
    voteIntro:{t:"Everyone in this house is lying about something. But only one of them killed him. Before I sleep tonight — who do I think it was?", vd:"Emotion: wary resolve. Delivery: low, clear, and unsentimental. Pace: deliberate. Intent: Bua wants to make the listener commit to the shape of their suspicion."},
    closingLine:{t:"Tomorrow morning I will know more than I know tonight. Sleep, if you can.", vd:"Emotion: tired certainty. Delivery: quiet, weathered, and almost tender. Pace: slow, with a pause before the final sentence. Intent: Bua leaves the listener carrying the unease into the night."},
    voteDistribution:{"Ritu bhabhi":48,"Naina":21,"Vikram":14,"Nikhil":9,"I don't know yet":8},
    theories:[
      {name:"Meera", time:"8 minutes ago", text:"Ritu made the tea, but I think Naina saw something in that room and is protecting the wrong person."},
      {name:"Kabir", time:"11 minutes ago", text:"Vikram came for Naina. The public humiliation gave him a reason, and everyone is looking at the family instead."},
      {name:"Sana", time:"15 minutes ago", text:"The missing key matters more than the ring. Someone needed the new room to feel private."},
      {name:"Arjun", time:"19 minutes ago", text:"Nikhil is too quiet. That is either innocence or the best performance in the house."}
    ]
  },

  /* Writer Studio demo aggregate. These are deliberately separate from the
     listener world so a missing analytics service can never affect play. */
  writerStudio: {
    scale: 3842,
    suspicion: {"Ritu bhabhi":41,"Naina":23,"Vikram":17,"Nikhil":8,"I don't know yet":11},
    suspicionOverTime: [
      {episode:"Ep 1",Ritu:22,Naina:31,Vikram:18,Unknown:29},
      {episode:"Ep 2",Ritu:41,Naina:23,Vikram:17,Unknown:11}
    ],
    topics: {
      ritu:[{label:"Last night",count:1884},{label:"Karan",count:1320},{label:"The tea tray",count:911},{label:"Midnight on that floor",count:724}],
      naina:[{label:"That night",count:1762},{label:"The wedding",count:1204},{label:"Vikram",count:978},{label:"The ring",count:542}],
      anjali:[{label:"What you saw",count:1518},{label:"Karan sir",count:1006},{label:"Ritu bhabhi",count:804},{label:"Who has the keys",count:414}]
    },
    freeText:[
      {tag:"Ritu alibi",count:684,questions:["Why was Ritu upstairs at midnight?","Did Ritu put something in the tea?"]},
      {tag:"Karan death",count:493,questions:["What really killed Karan?","Were the sleeping pills planted?"]},
      {tag:"Naina motive",count:315,questions:["Why did Naina invite Vikram?","Did Naina want the wedding to end?"]}
    ],
    answerTypes:{ANSWERED:58,DOESNT_KNOW:18,DEFLECTED:20,OUT_OF_WORLD:4},
    objects:{tray:72,keyboard:22,mic:66,engagement:48,lehenga:63,tornphoto:37,jewellery:54},
    averages:{clues:3.7,minutes:8.4},
    theoryClusters:[{label:"blame Ritu",percent:41},{label:"blame Vikram",percent:24},{label:"suspect a servant",percent:12},{label:"blame Naina",percent:10}],
    audienceRead:[
      {name:"Ritu",a:"Suspicious",av:61,b:"Sympathetic",bv:12},
      {name:"Naina",a:"Innocent",av:44,b:"Hiding something",bv:38},
      {name:"Vikram",a:"Volatile",av:48,b:"Protective",bv:29}
    ],
    recommendations:[
      "The audience has already convicted Ritu. Episode 3 should give them a reason to doubt themselves, or the finale will land flat.",
      "The empty key hook is the strongest missed clue. Put its consequence into dialogue before the next lock-in.",
      "Naina is read as both innocent and withholding. Reward that tension with one precise, voluntary truth."
    ],
    theoryInsight:"Ritu is the audience's working answer, but the strongest theories still circle access rather than motive. Make the next episode complicate who could enter the room, not simply who wanted Karan gone."
  }
};
