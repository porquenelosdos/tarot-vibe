const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

/*
 * Tarot card data
 * Key format:
 *   <two-digit-order>_<group>_<name>
 * Image filename must match key: images/<key>.png
 */

const TarotData = {
    // Major Arcana 01–22
    "01_the_fool": {
        title: "The Fool",
        poem: "A leap of faith into the blue,\nWith nothing owned and all to do.\nThe precipice is at your feet,\nWhere soul and sudden spirit meet."
    },
    "02_the_magician": {
        title: "The Magician",
        poem: "As high above, so low below,\nThe seeds of will begin to grow.\nWith tool and element in hand,\nYou shape the fabric of the land."
    },
    "03_the_high_priestess": {
        title: "The High Priestess",
        poem: "Secrets lie beneath the veil,\nWisdom waits beyond the pale.\nTrust intuition, still and deep,\nWhere hidden truths awake from sleep."
    },
    "04_the_empress": {
        title: "The Empress",
        poem: "Nurture blooms where you have sown,\nFertility in fields you own.\nAbundance flows, creativity,\nLife unfolds in harmony."
    },
    "05_the_emperor": {
        title: "The Emperor",
        poem: "Order, structure, solid ground,\nAuthority in actions found.\nPower wielded with steady hand,\nBuild the world as you have planned."
    },
    "06_the_hierophant": {
        title: "The Hierophant",
        poem: "Tradition, ritual, sacred ways,\nGuidance through the ancient maze.\nSeek the counsel of the wise,\nAnd learn the truths beneath the skies."
    },
    "07_the_lovers": {
        title: "The Lovers",
        poem: "Choices made with heart and soul,\nConnection deep, a shared goal.\nUnion, love, and harmony,\nDecisions shape your destiny."
    },
    "08_the_chariot": {
        title: "The Chariot",
        poem: "Drive and focus, moving fast,\nWillpower holds you to the mast.\nVictory is within your grasp,\nSteer the course and tightly clasp."
    },
    "09_strength": {
        title: "Strength",
        poem: "Courage tempered with gentle care,\nPatience, love, and strength to bear.\nMastering impulses with grace,\nYou triumph in the fiercest race."
    },
    "10_the_hermit": {
        title: "The Hermit",
        poem: "Solitude for inner light,\nSeek the truth within the night.\nWisdom grows when paths are still,\nReflect and follow your own will."
    },
    "11_wheel_of_fortune": {
        title: "Wheel of Fortune",
        poem: "Cycles turn, luck ebbs and flows,\nDestiny, the wheel that goes.\nEmbrace the change, rise or fall,\nFortune favors those who call."
    },
    "12_justice": {
        title: "Justice",
        poem: "Fairness, balance, cause and law,\nActions judged with mindful awe.\nTruth and clarity must prevail,\nIntegrity will tip the scale."
    },
    "13_the_hanged_man": {
        title: "The Hanged Man",
        poem: "Pause, surrender, see anew,\nChange perspective, shift your view.\nSacrifice can bring insight,\nA different path comes into sight."
    },
    "14_death": {
        title: "Death",
        poem: "Endings clear the path ahead,\nTransformation, old is shed.\nChange is constant, cycles spin,\nRebirth waits to welcome in."
    },
    "15_temperance": {
        title: "Temperance",
        poem: "Moderation, harmony, blend,\nBalance life, and wounds will mend.\nPatience guides the steady hand,\nPeaceful progress shapes the land."
    },
    "16_the_devil": {
        title: "The Devil",
        poem: "Temptation, bondage, fear and chains,\nConfront your shadow, break the reins.\nMaterial ties may cloud the mind,\nFreedom lies in truth you find."
    },
    "17_the_tower": {
        title: "The Tower",
        poem: "Sudden change, disruption strong,\nStructures fall to right the wrong.\nChaos clears the stagnant air,\nRebuild anew with fresh repair."
    },
    "18_the_star": {
        title: "The Star",
        poem: "Hope renewed, inspiration flows,\nGuiding light in darkness glows.\nFaith restored, your dreams aligned,\nPeace and healing now entwined."
    },
    "19_the_moon": {
        title: "The Moon",
        poem: "Illusion, mystery, shadows creep,\nIntuition rises from the deep.\nEmbrace uncertainty with care,\nHidden truths are waiting there."
    },
    "20_the_sun": {
        title: "The Sun",
        poem: "Joy, vitality, light and cheer,\nSuccess and clarity appear.\nWarmth and growth in every ray,\nHappiness will guide your way."
    },
    "21_judgement": {
        title: "Judgement",
        poem: "Reflection, reckoning, call to rise,\nTruth revealed before your eyes.\nRenewal comes from insight gained,\nAwaken, transform, unchained."
    },
    "22_the_world": {
        title: "The World",
        poem: "Completion, wholeness, cycles done,\nJourney finished, victories won.\nIntegration, harmony, and peace,\nA chapter closes, joys increase."
    },

    // Minor Arcana – Wands 23–36
    "23_wands_ace": {
        title: "Ace of Wands",
        poem: "A spark of fire, a staff of gold,\nA story waiting to be told.\nFrom sudden heat, creation springs,\nThe first wild pulse of daring things."
    },
    "24_wands_two": {
        title: "Two of Wands",
        poem: "Planning, foresight, seeds of fate,\nVision grows at destiny’s gate.\nDecisions call, the path is clear,\nBold steps bring what you hold dear."
    },
    "25_wands_three": {
        title: "Three of Wands",
        poem: "Progress, movement, enterprise,\nWaiting for results to rise.\nExpansion comes from taking chance,\nPatience mixes with advance."
    },
    "26_wands_four": {
        title: "Four of Wands",
        poem: "Celebration, home, and harmony,\nStability in company.\nJoy in roots and foundations strong,\nCommunity where hearts belong."
    },
    "27_wands_five": {
        title: "Five of Wands",
        poem: "Conflict, competition, challenge calls,\nDebate and struggle in crowded halls.\nTesting skills against the fray,\nGrowth emerges from the play."
    },
    "28_wands_six": {
        title: "Six of Wands",
        poem: "Victory, recognition, praise,\nTriumph shines in public gaze.\nConfidence and honor rise,\nAcknowledgement before your eyes."
    },
    "29_wands_seven": {
        title: "Seven of Wands",
        poem: "Defense, perseverance, stand your ground,\nChallenges arrive all around.\nCourage holds, resist the tide,\nMaintain your stance with strength and pride."
    },
    "30_wands_eight": {
        title: "Eight of Wands",
        poem: "Movement, speed, messages sent,\nProgress quick, momentum bent.\nActions unfold with rapid pace,\nSwift completion in your space."
    },
    "31_wands_nine": {
        title: "Nine of Wands",
        poem: "Resilience, courage, last defense,\nWeariness meets persistence tense.\nStand your ground, though tired you be,\nStrength ensures continuity."
    },
    "32_wands_ten": {
        title: "Ten of Wands",
        poem: "Burden, responsibility, heavy load,\nTasks accumulate along the road.\nPerseverance is what you need,\nCompletion comes from steadfast deed."
    },
    "33_wands_page": {
        title: "Page of Wands",
        poem: "Curiosity, discovery, spark of youth,\nIdeas take shape, seeking truth.\nAdventure calls with open eyes,\nMessages borne on wings that rise."
    },
    "34_wands_knight": {
        title: "Knight of Wands",
        poem: "Energy, action, passion bright,\nDrive to conquer, daring flight.\nAdventure, courage, fearless stride,\nMomentum carries on your side."
    },
    "35_wands_queen": {
        title: "Queen of Wands",
        poem: "Confidence, warmth, creativity,\nLeadership with clarity.\nCharisma, vision, bold and free,\nShe inspires with energy."
    },
    "36_wands_king": {
        title: "King of Wands",
        poem: "Vision, mastery, authority,\nLeadership and integrity.\nGuidance, courage, strength of will,\nHe brings success and ambition still."
    },

    // Minor Arcana – Cups 37–50
"37_cups_ace": {
    title: "Ace of Cups",
    poem: "A new emotional start appears,\nLove, compassion, flowing tears.\nHeart awakens, spirit sings,\nConnection bright, the joy it brings."
},
"38_cups_two": {
    title: "Two of Cups",
    poem: "Partnership, mutual attraction,\nHearts entwined in sweet reaction.\nUnion, harmony, feelings shared,\nTrust and love in lives prepared."
},
"39_cups_three": {
    title: "Three of Cups",
    poem: "Celebration, friendship, joy,\nRaise your glass, let spirits buoy.\nCommunity and festive cheer,\nGood times flow when friends are near."
},
"40_cups_four": {
    title: "Four of Cups",
    poem: "Introspection, apathy, rest,\nOpportunities may go unpressed.\nReflect before you act or choose,\nAvoiding boredom and misuse."
},
"41_cups_five": {
    title: "Five of Cups",
    poem: "Loss and sorrow weigh the mind,\nRegret may blind what’s left behind.\nYet hope remains if you can see,\nThe cups still standing hold the key."
},
"42_cups_six": {
    title: "Six of Cups",
    poem: "Nostalgia, memories, sweet delight,\nChildhood echoes in the night.\nKindness, gifts, and moments past,\nWarmth returns, connections last."
},
"43_cups_seven": {
    title: "Seven of Cups",
    poem: "Choices, illusions, dreams unclear,\nDecisions clouded by desire.\nWeigh options carefully and true,\nClarity will guide what you do."
},
"44_cups_eight": {
    title: "Eight of Cups",
    poem: "Abandon what no longer serves,\nSeek deeper truths and inner nerves.\nWalking away may be the key,\nFor growth, freedom, and harmony."
},
"45_cups_nine": {
    title: "Nine of Cups",
    poem: "Contentment, wishes realized,\nSatisfaction fully prized.\nGratitude fills heart and mind,\nHappiness and peace aligned."
},
"46_cups_ten": {
    title: "Ten of Cups",
    poem: "Emotional fulfillment, home and heart,\nFamily bonds, love's perfect art.\nHarmony, blessings, joy complete,\nLife feels full and truly sweet."
},
"47_cups_page": {
    title: "Page of Cups",
    poem: "Inspiration, messages, gentle start,\nCreative spark in tender heart.\nOpen mind and willing ear,\nImagination brings new cheer."
},
"48_cups_knight": {
    title: "Knight of Cups",
    poem: "Romantic, idealistic quest,\nFollowing heart and inner zest.\nCharm and elegance in motion,\nOffers guided by emotion."
},
"49_cups_queen": {
    title: "Queen of Cups",
    poem: "Compassion, empathy, deep care,\nEmotional wisdom beyond compare.\nSupport and nurture freely give,\nHer heart teaches all to live."
},
"50_cups_king": {
    title: "King of Cups",
    poem: "Emotional mastery, calm control,\nDiplomacy guides both heart and soul.\nCompassion, wisdom, steady hand,\nA leader with a heart that stands."
},

// Minor Arcana – Swords 51–64
"51_swords_ace": {
    title: "Ace of Swords",
    poem: "Clarity, truth, mental breakthrough,\nDecisions sharpen, cut right through.\nNew ideas, insight, intellect,\nThe power to analyze and reflect."
},
"52_swords_two": {
    title: "Two of Swords",
    poem: "Difficult choice, stalemate near,\nDecision clouded by doubt or fear.\nBalance both sides with careful thought,\nA path emerges once it’s sought."
},
"53_swords_three": {
    title: "Three of Swords",
    poem: "Heartache, sorrow, painful truth,\nLoss or betrayal wounds the youth.\nHealing comes with time and tears,\nUnderstanding grows through years."
},
"54_swords_four": {
    title: "Four of Swords",
    poem: "Rest, recuperation, pause and mend,\nTake a break before you bend.\nRecovery, meditation, peace,\nRecharge your mind before release."
},
"55_swords_five": {
    title: "Five of Swords",
    poem: "Conflict, tension, ego clash,\nWinning hollow, others crash.\nPick your battles wisely, friend,\nAvoid the strife that brings no end."
},
"56_swords_six": {
    title: "Six of Swords",
    poem: "Transition, journey, moving on,\nLeaving troubles where they belong.\nRecovery, progress, calmer seas,\nChange brings peace and mind at ease."
},
"57_swords_seven": {
    title: "Seven of Swords",
    poem: "Strategy, stealth, cunning play,\nHidden motives shape the way.\nBe careful whom you trust today,\nPlans may shift or go astray."
},
"58_swords_eight": {
    title: "Eight of Swords",
    poem: "Feeling trapped, restricted view,\nLimits imposed may not be true.\nFreedom comes by mind’s release,\nLook within for inner peace."
},
"59_swords_nine": {
    title: "Nine of Swords",
    poem: "Anxiety, worry, sleepless night,\nMental anguish keeps from light.\nFace fears honestly to find,\nCalm returns and peace of mind."
},
"60_swords_ten": {
    title: "Ten of Swords",
    poem: "Painful endings, ultimate defeat,\nRock bottom reached, the cycle complete.\nFrom endings rise, a new dawn near,\nLessons learned from sorrow clear."
},
"61_swords_page": {
    title: "Page of Swords",
    poem: "Curiosity, alertness, youthful mind,\nQuestions asked, new knowledge find.\nObservant, clever, messages sent,\nMental energy fully spent."
},
"62_swords_knight": {
    title: "Knight of Swords",
    poem: "Action, haste, decisive might,\nCharge ahead with fearless sight.\nIdeas move fast, swift and bold,\nEnergy drives all you hold."
},
"63_swords_queen": {
    title: "Queen of Swords",
    poem: "Intelligence, clarity, independent mind,\nTruth and fairness she will find.\nDiscernment sharp, emotions tamed,\nRational thought is rightly aimed."
},
"64_swords_king": {
    title: "King of Swords",
    poem: "Authority, strategic thinking, fair,\nLeadership and intellect rare.\nDecisions guided by the head,\nRational action carefully led."
},

// Minor Arcana – Pentacles 65–78
"65_pentacles_ace": {
    title: "Ace of Pentacles",
    poem: "New opportunity, material start,\nProsperity and growth impart.\nAbundance, career, financial seed,\nThe potential to succeed."
},
"66_pentacles_two": {
    title: "Two of Pentacles",
    poem: "Balance, juggling, adapt with skill,\nHandling change with steady will.\nPriorities shift and dance around,\nFlexibility will keep you sound."
},
"67_pentacles_three": {
    title: "Three of Pentacles",
    poem: "Collaboration, skill, mastery shown,\nTeamwork yields results well known.\nCraft and dedication recognized,\nSuccess through effort well devised."
},
"68_pentacles_four": {
    title: "Four of Pentacles",
    poem: "Possession, security, holding tight,\nResources guarded, caution might.\nLearn to balance saving and release,\nFind freedom in financial peace."
},
"69_pentacles_five": {
    title: "Five of Pentacles",
    poem: "Loss, hardship, financial strain,\nChallenges felt in cold and rain.\nSupport is near if you will seek,\nCommunity and care are not weak."
},
"70_pentacles_six": {
    title: "Six of Pentacles",
    poem: "Generosity, charity, giving flow,\nHelping others helps you grow.\nBalance wealth and kindness true,\nProsperity comes back to you."
},
"71_pentacles_seven": {
    title: "Seven of Pentacles",
    poem: "Patience, assessment, long-term view,\nEvaluate what you pursue.\nEffort grows slowly, rewards appear,\nInvest wisely, the path is clear."
},
"72_pentacles_eight": {
    title: "Eight of Pentacles",
    poem: "Apprenticeship, diligence, craft,\nMastery grows on steady raft.\nSkill refined through patient hands,\nSuccess comes from careful plans."
},
"73_pentacles_nine": {
    title: "Nine of Pentacles",
    poem: "Independence, luxury, reward,\nSelf-sufficiency, wealth adored.\nAchievement gained through effort past,\nEnjoy the fruits, prosperity lasts."
},
"74_pentacles_ten": {
    title: "Ten of Pentacles",
    poem: "Family legacy, stability, home,\nWealth and comfort widely known.\nGenerations benefit from care,\nFoundation solid, lives repair."
},
"75_pentacles_page": {
    title: "Page of Pentacles",
    poem: "Study, curiosity, practical start,\nLearning skills with earnest heart.\nOpportunities in material form,\nExploration of the worknorm."
},
"76_pentacles_knight": {
    title: "Knight of Pentacles",
    poem: "Responsibility, persistence, slow and steady,\nWork ethic strong, always ready.\nMethodical, reliable, patient path,\nProgress comes from careful math."
},
"77_pentacles_queen": {
    title: "Queen of Pentacles",
    poem: "Nurturing, practical, resourceful mind,\nComfort, home, and wealth combined.\nCaring for others while she grows,\nStability and abundance flows."
},
"78_pentacles_king": {
    title: "King of Pentacles",
    poem: "Mastery, security, financial might,\nLeadership in business, wealth in sight.\nPractical wisdom guides the land,\nSuccess is built with steady hand."
}

// You would continue in the same pattern for Cups (37–50), Swords (51–64), Pentacles (65–78)
};


function MyTarotDesklet(metadata, instance_id) {
    this._init(metadata, instance_id);
}

MyTarotDesklet.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function (metadata, instance_id) {
        Desklet.Desklet.prototype._init.call(this, metadata, instance_id);
        this.metadata = metadata;
        this._buildUI();
    },

    _buildUI: function () {
        this.container = new St.BoxLayout({
            vertical: true,
            style:
                "width: 280px;" +
                "background-color: rgba(20, 10, 30, 0.85);" +
                "border-radius: 15px;" +
                "padding: 15px;" +
                "border: 1px solid #4a3b6b;"
        });

        this.image = new St.Icon({
            icon_size: 250,
            style: "margin-bottom: 10px;"
        });

        this.label = new St.Label({
            text: "Tap the deck to seek your fate…",
            style:
                "text-align: center;" +
                "font-size: 11pt;" +
                "color: #e0d0f0;" +
                "font-family: Serif;"
        });

        this.label.clutter_text.line_wrap = true;
        this.label.set_width(250);

        this.container.add_child(this.image);
        this.container.add_child(this.label);
        this.setContent(this.container);

        // Default card back
        const backPath = this.metadata.path + "/images/card_back.png";
        this.image.set_gicon(
            new Gio.FileIcon({ file: Gio.File.new_for_path(backPath) })
        );

        // Click to draw
        this.container.set_reactive(true);
        this.container.connect("button-press-event", () => this._drawCard());
    },

    _drawCard: function () {
        const keys = Object.keys(TarotData);
        const key = keys[Math.floor(Math.random() * keys.length)];
        const card = TarotData[key];

        const imagePath = this.metadata.path + "/images/" + key + ".png";
        this.image.set_gicon(
            new Gio.FileIcon({ file: Gio.File.new_for_path(imagePath) })
        );

        this.label.set_text(card.title.toUpperCase() + "\n\n" + card.poem);

        this._playSounds();
    },

    _playSounds: function () {
        const soundPath = this.metadata.path + "/sounds/";

        try {
            GLib.spawn_command_line_async(
                "paplay " + soundPath + "shuffle.wav"
            );

            GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => {
                GLib.spawn_command_line_async(
                    "paplay " + soundPath + "flip.wav"
                );
                return false;
            });
        } catch (e) {
            // Fail silently
        }
    }
};

function main(metadata, instance_id) {
    return new MyTarotDesklet(metadata, instance_id);
}

