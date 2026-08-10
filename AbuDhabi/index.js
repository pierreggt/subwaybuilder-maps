(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Abu Dhabi Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro linking Zayed International Airport to Yas Island and the heart of Abu Dhabi.',
            notification: 'Welcome to Abu Dhabi!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro reliant l\'aeroport international Zayed a Yas Island et au coeur d\'Abu Dhabi.',
            notification: 'Bienvenue a Abu Dhabi !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Abu Dhabi',
        code: 'AUH',
        description: t('description'),
        population: 1170100,
        initialViewState: { zoom: 12, latitude: 24.47, longitude: 54.37, bearing: 0 }
    });

    api.cities.registerTab({ id: 'uae-auh', label: 'United Arab Emirates', cityCodes: ['AUH'] });

    api.map.setTileURLOverride({
        cityCode: 'AUH',
        tilesUrl: 'http://127.0.0.1:8080/AUH/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/AUH_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('AUH', {
        buildingsIndex: '/data/AUH/buildings_index.bin.gz',
        demandData: '/data/AUH/demand_data.json.gz',
        roads: '/data/AUH/roads.geojson.gz',
        runwaysTaxiways: '/data/AUH/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/AUH/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/AUH/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'AUH') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Abu Dhabi mod loaded successfully!');
})();
