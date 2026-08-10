(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Alexandria Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro along Alexandria\'s Mediterranean corridor, from the airport to Abu Qir.',
            notification: 'Welcome to Alexandria!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro le long du corridor mediterraneen d\'Alexandrie, de l\'aeroport a Abu Qir.',
            notification: 'Bienvenue a Alexandrie !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Alexandria',
        code: 'HBE',
        description: t('description'),
        population: 2393100,
        initialViewState: { zoom: 12, latitude: 31.20, longitude: 29.92, bearing: 0 }
    });

    api.cities.registerTab({ id: 'egypt-hbe', label: 'Egypt', cityCodes: ['HBE'] });

    api.map.setTileURLOverride({
        cityCode: 'HBE',
        tilesUrl: 'http://127.0.0.1:8080/HBE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/HBE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('HBE', {
        buildingsIndex: '/data/HBE/buildings_index.bin.gz',
        demandData: '/data/HBE/demand_data.json.gz',
        roads: '/data/HBE/roads.geojson.gz',
        runwaysTaxiways: '/data/HBE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/HBE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/HBE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'HBE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Alexandria mod loaded successfully!');
})();
