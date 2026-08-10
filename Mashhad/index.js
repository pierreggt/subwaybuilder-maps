(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Mashhad Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Iran\'s great pilgrimage city deserves, from the airport to the Imam Reza shrine.',
            notification: 'Welcome to Mashhad!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la grande ville de pelerinage iranienne, de l\'aeroport au sanctuaire de l\'Imam Reza.',
            notification: 'Bienvenue a Mashhad !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Mashhad',
        code: 'MHD',
        description: t('description'),
        population: 1579100,
        initialViewState: { zoom: 11, latitude: 36.28, longitude: 59.58, bearing: 0 }
    });

    api.cities.registerTab({ id: 'iran-thr', label: 'Iran', cityCodes: ['MHD'] });

    api.map.setTileURLOverride({
        cityCode: 'MHD',
        tilesUrl: 'http://127.0.0.1:8080/MHD/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/MHD_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MHD', {
        buildingsIndex: '/data/MHD/buildings_index.bin.gz',
        demandData: '/data/MHD/demand_data.json.gz',
        roads: '/data/MHD/roads.geojson.gz',
        runwaysTaxiways: '/data/MHD/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MHD/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MHD/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MHD') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Mashhad mod loaded successfully!');
})();
