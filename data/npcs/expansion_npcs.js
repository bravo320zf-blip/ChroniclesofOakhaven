/* ============================================================
   EXPANSION TAVERN NPCS
   ============================================================ */
window.OAKHAVEN.registerNpcs([
      {
        id: "bjorn", name: "Frost-Scout Bjorn", role: "Northern Trapper",
        greeting: "\"Brrr... keep your ale close, friend. A glacier cracked open north of Oakhaven, exposing the frozen halls of a Frost Giant Jarl.\"",
        discoverQuest: "frostpeak",
        options: [
          { label: "Ask for the route to Frostpeak Ice-Caverns.", reply: "\"Marked <strong>The Frostpeak Ice-Caverns</strong> on your Quest Board! Bring Firebolt or Survival skills—and watch for the Winterheart Pendant.\"", unlock: "frostpeak" },
          { label: "Ask about the cold.", reply: "\"A Pitch Torch or warm steel will save your fingers up there.\"" }
        ]
      },
      {
        id: "zara", name: "Treasure-Hunter Zara", role: "Relic Seeker",
        greeting: "\"Ever heard of Sseth, the Jade Serpent? Heavy rains just washed the mud off his sunken jungle temple south of the marshes!\"",
        discoverQuest: "sseth_temple",
        options: [
          { label: "Get the map to the Sunken Temple of Sseth.", reply: "\"Split the glory, keep the gold! <strong>The Sunken Temple of Sseth</strong> is now on your Quest Board. Bring antidotes for the serpent traps.\"", unlock: "sseth_temple" },
          { label: "Ask what relics lie inside.", reply: "\"Word is the High Priest still guards the Serpent-Fang Kris and Jade Scales.\"" }
        ]
      },
      {
        id: "cogsworth", name: "Tinkerer Pip Cogsworth", role: "Exiled Artificer",
        greeting: "\"My brass gears! The Clockwork Foundry of Brasshaven went rogue—the Master Automaton locked us all out!\"",
        discoverQuest: "brasshaven",
        options: [
          { label: "Offer to shut down Brasshaven Foundry.", reply: "\"Splendid! I've pinned <strong>The Clockwork Foundry of Brasshaven</strong> to your Quest Board. Look for the Aether-Coil Gauntlet in the dynamo wing!\"", unlock: "brasshaven" },
          { label: "Ask for a mechanical tip.", reply: "\"Tinkering or Chain Lightning will fry their brass relays in a heartbeat.\"" }
        ]
      },
      {
        id: "garrick", name: "Ser Garrick", role: "Wounded Bannerman",
        greeting: "\"Red smoke rises from the ridge again... the Undying Red Baron has rallied his cinder-knights inside Ashen Keep.\"",
        discoverQuest: "ashen_keep",
        options: [
          { label: "Swear to storm the Ashen Keep.", reply: "\"May the Dawn shield you. <strong>The Ashen Keep of the Red Baron</strong> is now on your Quest Board. Only seasoned heroes should face the Baron's Greatsword.\"", unlock: "ashen_keep" },
          { label: "Ask about the fortress defenses.", reply: "\"Check the blackened stables for a sally-port before assaulting the main gate.\"" }
        ]
      },
      {
        id: "marta", name: "Herb-Wife Marta", role: "Oakhaven Forager",
        greeting: "\"Don't wander into Gloomfen Bog after dusk, dearie. Swamp Hag Morwenna's lanterns have been luring travelers off the boardwalks.\"",
        discoverQuest: "gloomfen",
        options: [
          { label: "Promise to confront the Gloomfen Hag.", reply: "\"Brave soul! I've marked <strong>The Gloomfen Witch-Bog</strong> on your Quest Board. Her Witchwood Staff and Star-Brew are legendary!\"", unlock: "gloomfen" },
          { label: "Ask how to resist her hexes.", reply: "\"Keep your Spirit sharp, and don't drink from the green pools without Alchemy or Herbalism.\"" }
        ]
      },
	  {
        id: "barnaby", name: "Old Keeper Barnaby", role: "Retired Lighthouseman",
        greeting: "\"Green fire's burning atop Dreadmoor Lighthouse again! Ships'll smash on the reef if nobody snuffs that cursed beacon!\"",
        discoverQuest: "sunken_lighthouse",
        options: [
          { label: "Accept the Dreadmoor Lighthouse contract.", reply: "\"Bless ye! <strong>The Sunken Lighthouse of Dreadmoor</strong> is marked on your Quest Board. Grab my old Storm-Coat from the oil-shed if it's still dry.\"", unlock: "sunken_lighthouse" },
          { label: "Ask what haunts the tower.", reply: "\"Drowned wreckers and a wraith who calls himself the Lantern-Warden.\"" }
        ]
      },
      {
        id: "mireille", name: "Captain Mireille", role: "Oakhaven Watch Captain",
        greeting: "\"The Black Banner brigands took Ravencrest Fort last week. My militia is stretched thin—I need a solo specialist to break their hold.\"",
        discoverQuest: "bandit_citadel",
        options: [
          { label: "Take the bounty on Ravencrest Citadel.", reply: "\"Good steel! <strong>The Ravencrest Bandit Citadel</strong> is now on your Quest Board. Watch for their Warlord's halberd!\"", unlock: "bandit_citadel" },
          { label: "Ask for tactical advice.", reply: "\"The eastern drainage grate bypasses their gatehouse archers.\"" }
        ]
      },
      {
        id: "kaelen", name: "Sun-Seeker Kaelen", role: "Desert Archaeologist",
        greeting: "\"Have you heard of Solis? A sun-temple sealed in golden amber just cracked open beyond the southern dunes!\"",
        discoverQuest: "amber_sanctuary",
        options: [
          { label: "Get Kaelen's map to the Amber Sanctuary.", reply: "\"Wonderful! <strong>The Amber Sanctuary of Solis</strong> is on your Quest Board. Recover the Solar Lens before the dusk-cultists shatter it!\"", unlock: "amber_sanctuary" },
          { label: "Ask about the amber wards.", reply: "\"Firebolt or Spirit checks work wonders against resin-bound guardians.\"" }
        ]
      },
      {
        id: "torin", name: "Drake-Hunter Torin", role: "Scarred Mountaineer",
        greeting: "\"Smoke's curling off Wyrm Ridge! Young cinder-drakes moved into the crags—and where there's a brood, an Elder Wyrm isn't far behind...\"",
        discoverQuest: "wyrm_ridge",
        options: [
          { label: "Offer to clear the Scorched Nest of Wyrm Ridge.", reply: "\"Brave soul! <strong>The Scorched Nest of Wyrm Ridge</strong> is now on your Quest Board. Clear the nest first—if the Elder Wyrm wakes afterward, we'll face Part II together!\"", unlock: "wyrm_ridge" },
          { label: "Ask about fighting drakes.", reply: "\"Frost Nova chills their fire-breath right out of their lungs.\"" }
        ]
      },
      {
        id: "vaelor_scout", name: "Grave-Watcher Corvus", role: "Paladin Emissary",
        greeting: "\"Even after Malakor's fall, dark tremors shake the Blackspire Marshes. His Death-Knight Regent is trying to rebuild the Phylactery Throne below!\"",
        discoverQuest: "malakor_part2",
		reqQuest: "malakor",
        options: [
          { label: "Log the Part II Malakor lead on your Quest Board.", reply: "\"<strong>Part II: The Phylactery Throne of Malakor</strong> is pinned to your Quest Board. You must finish <em>The Sunken Vault of Malakor</em> first before descending!\"", unlock: "malakor_part2" },
          { label: "Ask what awaits below.", reply: "\"Regent Vaelor wields the Soulreaver Claymore. Bring Turn Undead and plenty of potions.\"" }
        ]
      },
      {
        id: "foreman_durn", name: "Foreman Durn", role: "Salt-Mine Survivor",
        greeting: "\"We struck a singing crystal wall in the Salt-Mines and half my crew walked toward the hum like sleepwalkers!\"",
        discoverQuest: "whispering_mines",
        options: [
          { label: "Mark both the Salt-Mines & Crystal Deep leads.", reply: "\"<strong>The Whispering Salt-Mines</strong> is on your Quest Board! Once you clear the outer mines, you'll be ready for <strong>Part II: The Singing Heart of the Crystal Deep</strong>.\"", unlock: "whispering_mines" },
          { label: "Ask about the crystal hum.", reply: "\"Plug your ears or steady your Spirit, and watch for the Echo-Glass Lantern.\"" }
        ]
      },
	  {
        id: "ul_mira_pilgrim", name: "Weeping Mother Mira", role: "Rothenian Traveler",
        greeting: "\"My sister went up Pelerin Pass to the Sanguine Lodge for aid, and never came back! They say the innkeepers hand travelers over to vampire raiders!\"",
        discoverQuest: "ul_sanguine_lodge",
        options: [
          { label: "Promise to investigate the Sanguine Lodge.", reply: "\"Bless you! <strong>The Sanguine Lodge</strong> is marked on your Quest Board. Check the wine rack in the cellar—I hear screams rise from beneath it.\"", unlock: "ul_sanguine_lodge" },
          { label: "Ask who runs the lodge.", reply: "\"Anton and Kalena Sorokin. Smile at their faces, but watch their wolf-hounds!\"" }
        ]
      },
      {
        id: "ul_derrick_scout", name: "Tunnel-Scout Derrick", role: "Underworld Runner",
        greeting: "\"Lost my whole scouting crew down in the Midden of the Flayed beneath the Butchery sinkhole... bones down there walk on their own!\"",
        discoverQuest: "ul_midden_flayed",
        options: [
          { label: "Get the coordinates to the Midden of the Flayed.", reply: "\"<strong>Midden of the Flayed</strong> is pinned to your Quest Board. If you meet a talking otyugh in the side cave, hear it out—it hates the ghouls as much as we do!\"", unlock: "ul_midden_flayed" },
          { label: "Ask about hazards.", reply: "\"Watch for hidden bear traps under the bones, and don't slip off the zip-rope!\"" }
        ]
      },
      {
        id: "ul_drow_courier", name: "Hooded Envoy Vaelis", role: "Drow Emissary",
        greeting: "\"Surface-dweller, swallow your pride and listen. Our last surface bastion, Camp Sicarius, has a ghoul traitor among its officers.\"",
        discoverQuest: "ul_camp_sicarius",
        options: [
          { label: "Accept the call-signs for Camp Sicarius.", reply: "\"<strong>Camp Sicarius</strong> is now on your Quest Board. Speak with Lieutenant Ryld, watch for trapdoor spiders, and unmask the traitor!\"", unlock: "ul_camp_sicarius" },
          { label: "Ask why you trust an outsider.", reply: "\"Because none of our own soldiers know who to trust anymore.\"" }
        ]
      },
      {
        id: "ul_myco_forager", name: "Spore-Picker Orlo", role: "Subterranean Botanist",
        greeting: "\"Ever seen a forest of walking mushrooms? Skullcap Forest is peaceful enough—unless you anger Ghloolhg or breathe the purple caps!\"",
        discoverQuest: "ul_skullcap_forest",
        options: [
          { label: "Mark Skullcap Forest on your map.", reply: "\"<strong>Skullcap Forest</strong> is on your Quest Board! Step lightly, and beware the darakhul contact Dinnas Grym if you start a fight.\"", unlock: "ul_skullcap_forest" },
          { label: "Ask which mushrooms are safe.", reply: "\"Herbalism or Survival will save your lungs down there.\"" }
        ]
      },
      {
        id: "ul_collector_vespera", name: "Lady Vespera", role: "Arcane Collector",
        greeting: "\"Green soul-flames are burning atop an old Red Goddess cathedral in the hills. Bring me one of those candles—and the Curate's notes—and I'll pay in gold!\"",
        discoverQuest: "ul_cathedral_flames",
        options: [
          { label: "Accept the contract for the Cathedral of Ten Thousand Flames.", reply: "\"Splendid! <strong>Cathedral of Ten Thousand Flames</strong> is on your Quest Board. Beware the kissing mask door and the vampire Curate's green fire!\"", unlock: "ul_cathedral_flames" },
          { label: "Ask where the flames come from.", reply: "\"Rumor says a vampire priestess named Radka brews them in a hidden cavern deeper underground.\"" }
        ]
      },
      {
        id: "ul_zobeck_agent", name: "Agent Kaspar", role: "Blue House Operative",
        greeting: "\"Our best spy, Heinrek Klaussen, was captured at The Throttle—the Ghoul Imperium's fortified roadblock. We need a solo hero to break him out!\"",
        discoverQuest: "ul_the_throttle",
        options: [
          { label: "Take the rescue mission to The Throttle.", reply: "\"<strong>The Throttle</strong> is marked on your Quest Board. Bring a pair of dice for the jailer Barsella, or bypass the wall through the northern ooze-tunnels!\"", unlock: "ul_the_throttle" },
          { label: "Ask who commands the outpost.", reply: "\"Iron Ghoul Pryor Ellsmark—though his shadowmancer second, Dru Wytchlight, is itching to stab him in the back.\"" }
        ]
      },
      {
        id: "ul_courier_bren", name: "Scarred Courier Bren", role: "Border Messenger",
        greeting: "\"Don't take Closed Throat Pass unless you're ready to run a gauntlet! A ghost knight named Sir Pravus rides down every traveler with a glowing lance!\"",
        discoverQuest: "ul_closed_throat",
        options: [
          { label: "Challenge the gauntlet of Closed Throat Pass.", reply: "\"You're mad, friend—but brave! <strong>Closed Throat Pass</strong> is on your Quest Board. Watch for illusory walls and his deadfall trap!\"", unlock: "ul_closed_throat" },
          { label: "Ask about his weapon.", reply: "\"A magical Breaker Lance that shatters shields and wards alike.\"" }
        ]
      },
      {
        id: "ul_ebon_whisper", name: "Cloaked Rebel Soren", role: "Resistance Contact",
        greeting: "\"Not all undead serve the Ghoul Emperor. Beneath Tannenbirg Castle lies a hidden sanctuary lit by star-fungi: the Starlit Chambers.\"",
        discoverQuest: "ul_starlit_chambers",
        options: [
          { label: "Get the secret seam location for The Starlit Chambers.", reply: "\"<strong>The Starlit Chambers</strong> is on your Quest Board. Seek Polama Hoffe and Goffery Pales—ally with them against the Imperium, or raid their armory if you dare.\"", unlock: "ul_starlit_chambers" },
          { label: "Ask how to find the entrance.", reply: "\"Look behind the stalagmites for an illusion-hidden seam in the stone.\"" }
        ]
      },
      {
        id: "ul_gnome_survivor", name: "Deep-Gnome Bimbil", role: "Shaken Explorer",
        greeting: "\"Don't breathe the spores in the Fungal Forest of Forgetting! A fungus-covered ghoul named Ilxanthiard is building an army of rot!\"",
        discoverQuest: "ul_fungal_forgetting",
        options: [
          { label: "Offer to purge the Fungal Forest of Forgetting.", reply: "\"<strong>Fungal Forest of Forgetting</strong> is pinned to your Quest Board! Watch the giant worm corpses—one is packed with explosives!\"", unlock: "ul_fungal_forgetting" },
          { label: "Ask about Ilxanthiard.", reply: "\"He stands in a circle of giant toadstools and commands them to crush intruders.\"" }
        ]
      },
      {
        id: "ul_fey_avenger", name: "Shadow-Fey Kaelis", role: "Court of Night Blade",
        greeting: "\"Deep in the Underworld, Pact Lich Augrimm lairs inside the petrified corpse of a giant purple worm. He murdered my kin—will you storm his citadel?\"",
        discoverQuest: "ul_breaching_worm",
        options: [
          { label: "Swear to breach the Breaching Worm Citadel.", reply: "\"<strong>Breaching Worm Citadel</strong> is on your Quest Board! Beware—the first lich you meet is a decoy. Find the secret book <em>The Undiscovered Country</em> to reach the true Augrimm!\"", unlock: "ul_breaching_worm" },
          { label: "Ask about the citadel's guards.", reply: "\"Barbed devils, bone swarms, and living ink-golems guard every coil.\"" }
        ]
      },
      {
        id: "ul_sun_warden", name: "Watch-Sergeant Hal", role: "Frontier Ranger",
        greeting: "\"Cave giants raided two farmsteads in broad daylight! Sunlight is supposed to turn them to stone—some shaman down by the Dark River brewed a sun-ward elixir!\"",
        discoverQuest: "ul_rising_sun",
        options: [
          { label: "Track the Sunseeker Tribe to the Dark River.", reply: "\"<strong>To Greet the Rising Sun</strong> is on your Quest Board! Stop Shaman Savvess and rescue the captives before the ghouls steal her elixir!\"", unlock: "ul_rising_sun" },
          { label: "Ask how the giants fit in the tunnels.", reply: "\"They drank a shrinking brew—and they can snap back to full giant size mid-fight!\"" }
        ]
      },
      {
        id: "ul_stoneboar_exile", name: "Dwarf Exile Brokk", role: "Stoneboar Clansman",
        greeting: "\"A paranoid cave dragon named Ashkreigel enslaved my clan atop a ziggurat of ghoul bones! He's twisted our own kin into stone-skinned zealots!\"",
        discoverQuest: "ul_dwarven_redoubt",
        options: [
          { label: "Pledge to liberate The Last Dwarven Redoubt.", reply: "\"By the ancestors! <strong>The Last Dwarven Redoubt</strong> is on your Quest Board. Gather the three gem keys on the ziggurat's tiers to summon Ashkreigel—and beware his pet purple worm!\"", unlock: "ul_dwarven_redoubt" },
          { label: "Ask about the dwarven weapons.", reply: "\"An Impaling War Pick lies hidden on the old workbenches, and our finest adamantine plate rests in the dragon's hoard.\"" }
        ]
      },
	  {
        id: "nf_watcher_nikolas", name: "Watcher Recruiter Nikolas", role: "Alper Militia Envoy",
        greeting: "\"The eternal night grows colder up in the Lands of Alper. General Aivar needs fresh cadets at Northern Lookout—Krampus have been slaughtering lumbermen in the Crystal Mounts!\"",
        discoverQuest: "nf_1_secrets_ice",
        options: [
          { label: "Enlist for the Nightfell Campaign (Part I: Secrets in the Ice).", reply: "\"Good steel! <strong>Nightfell Part I: Secrets in the Ice</strong> is pinned to your Quest Board. Complete each chapter to unlock the next across the eternal night of Iùrmen!\"", unlock: "nf_1_secrets_ice" },
          { label: "Ask about the Watchers of Alper.", reply: "\"General Aivar built us from the ashes after the Last Sun. Report to Captain Snaer at Darkmist first.\"" }
        ]
      },
      {
        id: "nf_owlrock_runner", name: "Warden Scout Sareth", role: "Eastern Mark Messenger",
        reqQuest: "nf_3_pale_moon", // Appears in Tavern only after finishing the Alper Cycle (Parts I-III)
        greeting: "\"Word of your deeds under the pale moon reached the Eastern Mark! Owlrock is suffocating under a witch's curse—High Priestess Anvernia begs for your aid!\"",
        discoverQuest: "nf_4_curse_owlrock",
        options: [
          { label: "Begin the Witches' Cycle (Part IV: The Curse of Owlrock).", reply: "\"May Mirithlen guide you! <strong>Nightfell Part IV: The Curse of Owlrock</strong> is now open on your Quest Board!\"", unlock: "nf_4_curse_owlrock" },
          { label: "Ask what plagues Owlrock.", reply: "\"A Gray Woman named Mirgan Grimfeather—and whispers of the lost village of Vaas.\"" }
        ]
      },
]);
