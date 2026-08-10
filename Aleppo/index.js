(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Aleppo Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Syria\'s second city deserves, from the historic Old City to the international airport.',
            notification: 'Welcome to Aleppo!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la deuxieme ville de Syrie, de la vieille ville historique a l\'aeroport international.',
            notification: 'Bienvenue a Alep !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Aleppo',
        code: 'ALP',
        description: t('description'),
        population: 981800,
        initialViewState: { zoom: 10, latitude: 36.1992, longitude: 37.1637, bearing: 0 }
    });

    api.cities.registerTab({ id: 'syria-dam', label: 'Syria', cityCodes: ['ALP'] });

    api.map.setTileURLOverride({
        cityCode: 'ALP',
        tilesUrl: 'http://127.0.0.1:8080/ALP/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/ALP_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('ALP', {
        buildingsIndex: '/data/ALP/buildings_index.bin.gz',
        demandData: '/data/ALP/demand_data.json.gz',
        roads: '/data/ALP/roads.geojson.gz',
        runwaysTaxiways: '/data/ALP/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/ALP/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/ALP/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'ALP') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Aleppo mod loaded successfully!');
})();
