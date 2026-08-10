(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Damascus Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Syria\'s capital deserves, from the Old City to the international airport.',
            notification: 'Welcome to Damascus!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la capitale syrienne, de la vieille ville a l\'aeroport international.',
            notification: 'Bienvenue a Damas !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Damascus',
        code: 'DAM',
        description: t('description'),
        population: 1685050,
        initialViewState: { zoom: 10, latitude: 33.5131, longitude: 36.3096, bearing: 0 }
    });

    api.cities.registerTab({ id: 'syria-dam', label: 'Syria', cityCodes: ['DAM'] });

    api.map.setTileURLOverride({
        cityCode: 'DAM',
        tilesUrl: 'http://127.0.0.1:8080/DAM/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/DAM_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('DAM', {
        buildingsIndex: '/data/DAM/buildings_index.bin.gz',
        demandData: '/data/DAM/demand_data.json.gz',
        roads: '/data/DAM/roads.geojson.gz',
        runwaysTaxiways: '/data/DAM/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/DAM/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/DAM/ocean_depth_index_contours.json.gz'
    });

    api.map.setLayerOverride({
        layerId: 'parks-large',
        sourceLayer: 'landuse',
        filter: ['in', ['get', 'kind'], ['literal',
            ['park','garden','nature_reserve','grass','cemetery','golf_course',
             'forest','wood','meadow','village_green','recreation_ground','pitch','zoo','allotments']]]
    });

    api.map.setLayerOverride({
        layerId: 'airports',
        sourceLayer: 'landuse',
        filter: ['==', ['get', 'kind'], 'aerodrome']
    });

    // Note (07/08/2026) : les tentatives de masquage de la couche
    // 'industrial' via setLayerOverride (paint puis filter) ici se sont
    // averees sans effet -- ce layerId n'existe pas cote client (verifie en
    // inspectant le bundle app.asar du jeu). La solution retenue exclut le
    // kind 'industrial' directement a la source dans depot/maps.py
    // (_process_tile_worker), donc plus besoin d'override ici -- voir
    // CLAUDE.md pour le detail.

    api.hooks.onCityLoad(function(cityCode) {
        if (cityCode === 'DAM') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Damascus mod loaded successfully!');
})();
