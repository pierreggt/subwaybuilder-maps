(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Mecca & Jeddah Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro linking Jeddah, the Red Sea gateway, to Mecca, Islam\'s holiest city, across the Haramain corridor.',
            notification: 'Welcome to Mecca & Jeddah!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro reliant Djeddah, la porte de la mer Rouge, a La Mecque, ville la plus sainte de l\'Islam, a travers le corridor Haramain.',
            notification: 'Bienvenue a La Mecque & Djeddah !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Mecca & Jeddah',
        code: 'MKJ',
        description: t('description'),
        population: 3380200,
        initialViewState: { zoom: 12, latitude: 21.54, longitude: 39.19, bearing: 0 }
    });

    api.cities.registerTab({ id: 'saudi-ruh', label: 'Saudi Arabia', cityCodes: ['MKJ'] });

    api.map.setTileURLOverride({
        cityCode: 'MKJ',
        tilesUrl: 'http://127.0.0.1:8080/MKJ/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/MKJ_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MKJ', {
        buildingsIndex: '/data/MKJ/buildings_index.bin.gz',
        demandData: '/data/MKJ/demand_data.json.gz',
        roads: '/data/MKJ/roads.geojson.gz',
        runwaysTaxiways: '/data/MKJ/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MKJ/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MKJ/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MKJ') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Mecca & Jeddah mod loaded successfully!');
})();
