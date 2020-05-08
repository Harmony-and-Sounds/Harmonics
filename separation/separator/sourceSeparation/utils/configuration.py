#!/usr/bin/env python
# coding: utf8

""" Module that provides configuration loading function. """

import json

try:
    import importlib.resources as loader
except ImportError:
    import importlib_resources as loader

from os.path import exists

from .. import resources, HarmonicsError



def load_configuration(descriptor):

    name = descriptor
    if not loader.is_resource(resources, f'{name}.json'):
        raise HarmonicsError(f'No embedded configuration {name} found')
    with loader.open_text(resources, f'{name}.json') as stream:
        return json.load(stream)
    # Standard file reading.
    if not exists(descriptor):
        raise HarmonicsError(f'Configuration file {descriptor} not found')
    with open(descriptor, 'r') as stream:
        return json.load(stream)
