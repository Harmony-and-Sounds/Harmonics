
import json

from argparse import ArgumentParser
from tempfile import gettempdir
from os.path import exists, join


OPT_INPUT = {
    'dest': 'inputs',
    'nargs': '+',
    'help': 'List of input audio filenames',
    'required': True
}


OPT_OUTPUT = {
    'dest': 'output_path',
    'default': join(gettempdir(), 'separated_audio'),
    'help': 'Path of the output directory to write audio files in'
}

OPT_FORMAT = {
    'dest': 'filename_format',
    'default': '{filename}/{instrument}.{codec}',
    'help': (
        'Template string that will be formatted to generated'
        'output filename. Such template should be Python formattable'
        'string, and could use {filename}, {instrument}, and {codec}'
        'variables.'
    )
}

OPT_PARAMS = {
    'dest': 'configuration',
    'default': '2stems',
    'type': str,
    'action': 'store',
    'help': 'JSON filename that contains params'
}

OPT_OFFSET = {
    'dest': 'offset',
    'type': float,
    'default': 0.,
    'help': 'Set the starting offset to separate audio from.'
}

OPT_DURATION = {
    'dest': 'duration',
    'type': float,
    'default': 600.,
    'help': (
        'Set a maximum duration for processing audio '
        '(only separate offset + duration first seconds of '
        'the input file)')
}

OPT_CODEC = {
    'dest': 'codec',
    'choices': ('wav', 'mp3', 'ogg', 'm4a', 'wma', 'flac'),
    'default': 'wav',
    'help': 'Audio codec to be used for the separated output'
}

OPT_BITRATE = {
    'dest': 'bitrate',
    'default': '128k',
    'help': 'Audio bitrate to be used for the separated output'
}

OPT_MWF = {
    'dest': 'MWF',
    'action': 'store_const',
    'const': True,
    'default': False,
    'help': 'Whether to use multichannel Wiener filtering for separation',
}

OPT_MUSDB = {
    'dest': 'mus_dir',
    'type': str,
    'required': True,
    'help': 'Path to folder with musDB'
}

OPT_DATA = {
    'dest': 'audio_path',
    'type': str,
    'required': True,
    'help': 'Path of the folder containing audio data for training'
}

OPT_ADAPTER = {
    'dest': 'audio_adapter',
    'type': str,
    'help': 'Name of the audio adapter to use for audio I/O'
}

OPT_VERBOSE = {
    'action': 'store_true',
    'help': 'Shows verbose logs'
}


def _add_common_options(parser):
    parser.add_argument('-a', '--adapter', **OPT_ADAPTER)
    parser.add_argument('-p', '--params_filename', **OPT_PARAMS)
    parser.add_argument('--verbose', **OPT_VERBOSE)


def _create_train_parser(parser_factory):

    parser = parser_factory('train', help='Train a source separation model')
    _add_common_options(parser)
    parser.add_argument('-d', '--data', **OPT_DATA)
    return parser


