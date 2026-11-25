/* ============================================================
   CORE TAVERN NPCS
   ============================================================ */
window.OAKHAVEN.registerNpcs([
      {
        id: "bram", name: "Innkeeper Bram", role: "Owner of the Rusty Flagon",
        greeting: "\"Welcome to the Flagon, traveler! A warm bed restores your HP, MP, and Luck for 10 GP. Need news of the frontier?\"",
        options: [
          { label: "Ask about local dangers.", reply: "\"The Town Crier's been shouting about Malakor's Sunken Vault in the marshes. Talk to the folks seated around the fire—half of 'em have lost kin or treasure out yonder.\"" },
          { label: "Ask about surviving dungeons.", reply: "\"Rule one of Oakhaven: Stash your extra gold and gear in the Personal Vault! If the Temple has to drag your soul back from death, whatever you carried stays in the dirt.\"" }
        ]
      },
      {
        id: "lyra", name: "Elven Ranger Lyra", role: "Thornwood Scout",
        greeting: "\"The mist over Thornwood has turned sour. Corrupt druids are waking the old burial mounds...\"",
        discoverQuest: "thornwood",
        options: [
          { label: "Offer to investigate the Thornwood Barrows.", reply: "\"Bless your steel! I've marked <strong>The Whispering Barrows of Thornwood</strong> on your Quest Board. Watch for the wounded white stag—kindness carries power in those woods.\"", unlock: "thornwood" },
          { label: "Ask for survival tips.", reply: "\"Herbalism and Firebolt work wonders against the living briars. I left an emergency supply cache near the trailhead.\"" }
        ]
      },
      {
        id: "thorek", name: "Prospector Thorek", role: "Dwarven Delver",
        greeting: "\"Bah! Kobolds and rogue brass sentries drove my clan right out of Karak-Zul's upper shafts!\"",
        discoverQuest: "karak_zul",
        options: [
          { label: "Ask for the map to Karak-Zul.", reply: "\"Ye've got spine! I've pinned <strong>The Ironforge Depths of Karak-Zul</strong> to your Quest Board. Check the foreman's shack for the rail key, and watch the Obsidian Golem!\"", unlock: "karak_zul" },
          { label: "Ask about Dwarven crafting.", reply: "\"Bring Iron Ore and Runed Shards back to Oakhaven's Forge & Workbench—finest weapons ye'll ever swing.\"" }
        ]
      },
      {
        id: "vex", name: "Hooded Smuggler Vex", role: "Shadowy Mariner",
        greeting: "\"Keep your voice low, friend. Ghost ship drifted into Saltfang Cove last moon—packed with Spanish gold, if you can handle dead sailors.\"",
        discoverQuest: "saltfang",
        options: [
          { label: "Get the coordinates to Saltfang Cove.", reply: "\"Deal. <strong>The Smuggler's Cove of Saltfang</strong> is now on your Quest Board. Find Captain Marrowbone's Black Doubloon in the gun deck before crossing swords with him.\"", unlock: "saltfang" },
          { label: "Ask about your gear cache.", reply: "\"I stashed a bomb and potion behind a false rum cask on the cave beach. Help yourself.\"" }
        ]
      },
      {
        id: "aldous", name: "Weeping Scholar Aldous", role: "Exiled Arcanist",
        greeting: "\"My mentor Vaelen's spire has gone mad! The stairs shift on their own and his astral echo attacks anyone who enters!\"",
        discoverQuest: "crimson_spire",
        options: [
          { label: "Promise to climb the Crimson Spire.", reply: "\"Thank the stars! I've recorded <strong>The Crimson Spire of Vaelen</strong> on your Quest Board. It is perilous—train at the Guildhall first, and trust only the mirror that shows your true self.\"", unlock: "crimson_spire" },
          { label: "Ask what you dropped inside.", reply: "\"My satchel near the Apex holds a Greater Potion and Mana Elixir. Take them if you reach the top!\"" }
        ]
      }
]);
