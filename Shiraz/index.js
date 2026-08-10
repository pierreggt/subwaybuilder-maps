(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Shiraz Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Iran\'s city of poets and gardens deserves, from the airport to the historic tombs.',
            notification: 'Welcome to Shiraz!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la ville iranienne des poetes et des jardins, de l\'aeroport aux tombeaux historiques.',
            notification: 'Bienvenue a Chiraz !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Shiraz',
        code: 'SYZ',
        description: t('description'),
        population: 819100,
        initialViewState: { zoom: 11, latitude: 29.62, longitude: 52.53, bearing: 0 }
    });

    api.cities.registerTab({ id: 'iran-thr', label: 'Iran', cityCodes: ['SYZ'] });

    api.map.setTileURLOverride({
        cityCode: 'SYZ',
        tilesUrl: 'http://127.0.0.1:8080/SYZ/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/SYZ_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('SYZ', {
        buildingsIndex: '/data/SYZ/buildings_index.bin.gz',
        demandData: '/data/SYZ/demand_data.json.gz',
        roads: '/data/SYZ/roads.geojson.gz',
        runwaysTaxiways: '/data/SYZ/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/SYZ/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/SYZ/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'SYZ') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Shiraz mod loaded successfully!');
})();
