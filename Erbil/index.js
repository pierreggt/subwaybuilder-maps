(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Erbil Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro the Kurdistan Region\'s capital deserves, from the airport to the historic Citadel.',
            notification: 'Welcome to Erbil!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la capitale de la region du Kurdistan, de l\'aeroport a la Citadelle historique.',
            notification: 'Bienvenue a Erbil !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Erbil',
        code: 'ERB',
        description: t('description'),
        population: 389800,
        initialViewState: { zoom: 11, latitude: 36.1912, longitude: 44.0094, bearing: 0 }
    });

    api.cities.registerTab({ id: 'iraq-bgd', label: 'Iraq', cityCodes: ['ERB'] });

    api.map.setTileURLOverride({
        cityCode: 'ERB',
        tilesUrl: 'http://127.0.0.1:8080/ERB/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/ERB_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('ERB', {
        buildingsIndex: '/data/ERB/buildings_index.bin.gz',
        demandData: '/data/ERB/demand_data.json.gz',
        roads: '/data/ERB/roads.geojson.gz',
        runwaysTaxiways: '/data/ERB/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/ERB/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/ERB/ocean_depth_index_contours.json.gz'
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

    api.hooks.onCityLoad(function(cityCode) {
        if (cityCode === 'ERB') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Erbil mod loaded successfully!');
})();
