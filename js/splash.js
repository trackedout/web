// haha definitely didn't steal this 
function changeSub(num) {
  document.getElementById("subtitle").innerText = say[num];
}

var say = [];
say[0] = "Welcome!";
say[1] = "bottom text";
say[2] = "Tango Tek is cool";
say[3] = "The game you know and love";
say[4] = "Hermitcraft my beloved";
say[5] = "Well hello there my fellow miners and crafters";
say[6] = "The dungeon is ready for its next victim";
say[7] = "just a whole bunch o nerds";
say[8] = "Also try Decked Out!";
say[9] = "[insert splash title here]";
say[10] = "Batteries not included";
say[11] = "What's in the chest?";
say[12] = "Where's the artifact?";
say[13] = "RUN!";
say[14] = "Flee with extra flee!";
say[15] = "alt + F4";
say[16] = "🐦 @trackedoutmc";
say[17] = "shadow is cool";
say[18] = "minecraft";
say[19] = "minceraft";
say[20] = "Running on Minecraft 1.20.1";
say[21] = "don't look directly at the bugs";
say[22] = "tracked out";
say[23] = "Now With 100% more Ravagers!";
say[24] = "Level 5 when?";
say[25] = "Dunga dunga.";
say[26] = "RIP Willie";
say[27] = "Loot and Scoot!";
say[28] = "Ravager or Ravenger?";
say[29] = "Etho wins again!";
say[30] = "No pumpkin pies or snowballs!";
say[31] = "Greed is good!";
say[32] = "Greed kills!";
say[33] = "Look out for Shriekers!";
say[34] = "Over 40 cards!";
say[35] = "Tango of the Tek variety!";
say[36] = "Hi Mrs Tango!";
say[37] = "Be careful around berries!";
say[38] = "The dungeon doors open again!";
say[39] = "Frost me timbers!";
say[40] = "#FreeRusty";
say[41] = "“Gem Is Great!”";
say[42] = "Need a warden hug?";
say[43] = "Free ravager cuddles!";
say[44] = "Death Loop… AGAIN?";
say[45] = "FOCUS CHEESE";
say[46] = "Focused Sleeping!";
say[47] = "Get Etho'ed!";
say[48] = "Flipping levers backstage…";
say[49] = "Warden pressure plate party!";
say[50] = "Tryhard Mode Engaged";
say[51] = "Compass training not included";
say[52] = "“Hi, I'm Cleo!”";
say[53] = "Trick-or-Treat!";
say[54] = "Verticality, now with Horizontality!";
say[55] = "Compass! Compass harder!";
say[56] = "Please don't break Tango's door.";
say[57] = "RECKLESS CHARGE!";
say[58] = "Don't fall into the redstone!";
say[59] = "Nighttime Willie or Daytime Willie?";
say[60] = "Pain, Panic, and Pancakes";
say[61] = "The River of Souls claims another.";
say[62] = "Don't forget your Artifake™!";
say[63] = "Turn up hostile mob sounds!";
say[64] = "Got any more of them shards?";
say[65] = "Shards for green cards!";
say[66] = "Porkchop Power!";
say[67] = "DO2: an overly complicated berry farm!";
say[68] = "Shrieking Shrackers!";
say[69] = "Coming soon™";

var howmany = say.length;
var bRand = 0;
bRand = Math.random();
bRand = Math.floor(bRand * howmany);
sayWhat = say[bRand];
document.getElementById("subtitle").innerText = sayWhat;

function changeSplash(num) {
  document.getElementById("subtitle").innerText = say[num];
  var ret = "Set current splash to splash " + num + ", " + say[num];
  return ret;
}